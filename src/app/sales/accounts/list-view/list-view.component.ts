import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteTransitionAnimation, DoneLoadingTransitionAnimation } from 'app/common/ui/animations';
import { Subscription } from 'rxjs/Subscription';

import { AccountsService } from '../accounts.service';
import { AccountSourcesService } from '../account-sources.service';
import { UsersService } from 'app/common/users';

import { Account, AccountSource } from '../accounts';
import { ViewState } from '../../../common/ui/views/view-state';
import { UiState, UiStateComponentObject } from '../../../common/interfaces/ui-state.interface';

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
    animations: [RouteTransitionAnimation, DoneLoadingTransitionAnimation],
    host: {
        '[@routeTransition]': ''
    }
})
export class ListViewComponent implements OnInit, UiState {
    accounts: Array<Account>;
    accountSources: Array<AccountSource>;

    uiState: UiStateComponentObject = new UiStateComponentObject(true);

    listState: AccountListState = {
        accountSource: null
    };

    onAccountSourceChange: EventEmitter<AccountSource> = new EventEmitter();

    private onAccountSourceChangeListener: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private accountsService: AccountsService,
        private accountSourcesService: AccountSourcesService,
        private usersService: UsersService
    ) { }

    ngOnInit() {
        this.accountsService.getAll().subscribe(
            accounts => this.onAccountsLoad(accounts),
            error => this.uiOnError(error)
        );
        this.onAccountSourceChangeListener = this.onAccountSourceChange.subscribe(this.onAccountSourceChanged.bind(this));
    }

    uiOnComplete() {

    }

    uiOnError(error: Error) {
        this.uiState.onError(error);
    }

    onCreateAccount() {
        this.router.navigate([{ outlets: { 'account': [ 'create' ] } } ], { relativeTo: this.route });
    }

    /* Account events */

    onAccountsLoad(accounts: Array<Account>) {
        this.accounts = accounts;

        this.accountSourcesService.getAllAccountSources(this.accounts).subscribe(sources => this.accountSources = sources);

        this.usersService.getState().subscribe(this.onUserStateLoaded.bind(this));

        this.uiState.isComplete = true;
    }

    onAccountClicked(account: Account, event: Event) {
        if(account)
            this.accountsService.navigateTo(account);

        return false;
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
