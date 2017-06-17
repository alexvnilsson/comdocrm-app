import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RouteTransitionAnimation } from 'common/ui/animations';
import { Subscription } from 'rxjs/Subscription';

import { AccountsService } from '../accounts.service';
import { AccountSourcesService } from '../account-sources.service';
import { UsersService } from 'common/users';

import { Account, AccountSource } from '../../models/account';

export interface AccountListState {
    accountSource?: AccountSource;
}

export const USER_STATE = {
    ACCOUNT_SOURCE: 'Sales_Accounts_Source'
};

@Component({
    selector: 'ccrm-sales-accounts-list-view',
    templateUrl: './list-view.component.html',
    styleUrls: ['./list-view.component.scss'],
    animations: [RouteTransitionAnimation],
    host: {
        '[@routeTransition]': 'true'
    }
})
export class ListViewComponent implements OnInit {
    accounts: Array<Account>;
    accountSources: Array<AccountSource>;

    listState: AccountListState = {
        accountSource: null
    };

    onAccountSourceChange: EventEmitter<AccountSource> = new EventEmitter();

    private onAccountSourceChangeListener: Subscription;

    constructor(
        private router: Router,
        private accountsService: AccountsService,
        private accountSourcesService: AccountSourcesService,
        private usersService: UsersService
    ) { }

    ngOnInit() {
        this.accountsService.getAll().subscribe((accounts: Account[]) => this.onAccountsLoad(accounts));
        this.onAccountSourceChangeListener = this.onAccountSourceChange.subscribe(this.onAccountSourceChanged.bind(this));
    }

    /* Account events */

    onAccountsLoad(accounts: Array<Account>) {
        this.accounts = accounts;

        this.accountSourcesService.getAllAccountSources(this.accounts).subscribe(sources => this.accountSources = sources);

        this.usersService.getState().subscribe(this.onUserStateLoaded.bind(this));
    }

    clickAccount(account: Account) {
        if(account)
            this.router.navigate(['/sales/accounts/view', account.slug]);
    }

    onAccountSourceChanged(source: AccountSource) {

    }

    /* End Account events */

    /* Account source events */

    onUserStateLoaded(state: any) {
        if(state[USER_STATE.ACCOUNT_SOURCE]) {
            this.accountSources.forEach((source: AccountSource) => {
                if(source.id == state[USER_STATE.ACCOUNT_SOURCE])
                    this.listState.accountSource = source;
            })
        }
    }

    /* End Account source events */

    /* Account source methods */

    isFilterAccepting(account: Account) {
        if(this.listState.accountSource)
            if(account.source && account.source.id)
                if(this.listState.accountSource.id == account.source.id)
                    return true;
                else
                    return false;
            else
                return false;

        return true;
    }

    setAccountSource(source?: AccountSource, reset?: boolean) {
        let shouldEmit: boolean = false;

        if(this.listState.accountSource && this.listState.accountSource != source)
            shouldEmit = true;

        if(source && source.id) {
            this.listState.accountSource = source;

            this.usersService.setState(USER_STATE.ACCOUNT_SOURCE, source.id);

            if(shouldEmit)
                this.onAccountSourceChange.next(source);
        }
        
        if (reset) {
            this.listState.accountSource = null;
            this.usersService.setState(USER_STATE.ACCOUNT_SOURCE, null);
            this.onAccountSourceChange.next(null);
        }

        return false;
    }

    resetAccountSource() {
        return this.setAccountSource(null, true);
    }

    getAccountSourceName(noTrim?: boolean) {
        if(this.listState.accountSource) {
            let source: AccountSource = this.listState.accountSource;

            if(source.displayName.length > 16 && noTrim !== true)
                return `${source.displayName.substr(0, 16)}...`;
            else
                return source.displayName;
        }

        return null;
    }

    /* End Account source methods */
}
