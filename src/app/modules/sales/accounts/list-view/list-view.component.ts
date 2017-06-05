import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from '../accounts.service';
import { AccountSourcesService } from '../account-sources.service';
import { AccountListView } from './account-list-view';
import { Account, AccountSource } from '../account';
import { Subscription } from 'rxjs/Subscription';

import { RouteTransitionAnimation } from 'app/ui/animations';

export interface AccountListState {
    accountSource?: AccountSource;
}

export const AccountStateOptions = {
    Source: 'Source'
}

@Component({
    selector: 'app-list-view',
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
        private accountSourcesService: AccountSourcesService
    ) { }

    ngOnInit() {
        this.accountsService.getAll(this.onAccountsLoad.bind(this));

        this.onAccountSourceChangeListener = this.onAccountSourceChange.subscribe(this.onAccountSourceChanged.bind(this));
    }

    onAccountsLoad(accounts: Array<Account>) {
        this.accounts = accounts;

        this.accountSources = this.accountSourcesService.getAllAccountSources(this.accounts);
    }

    onFilterList() {
        if(this.listState.accountSource) {
            
        }
    }

    onOpenAccount(accountSlug: string) {
        this.router.navigate(['/sales/accounts/view', accountSlug]);
    }

    onAccountSourceChanged(source: AccountSource) {

    }

    getFilterAcceptsAccount(account: Account) {
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

    setAccountSource(source: AccountSource) {
        let shouldEmit: boolean = false;

        if(this.listState.accountSource && this.listState.accountSource != source)
            shouldEmit = true;

        if(source && source.id) {
            this.listState.accountSource = source;
        }

        if(shouldEmit)
            this.onAccountSourceChange.next(source);

        return false;
    }

    resetAccountSource() {
        let shouldEmit: boolean = false;

        if(this.listState.accountSource != null)
            shouldEmit = true;

        this.listState.accountSource = null;

        this.onAccountSourceChange.next(null);

        return false;
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

    getAccountListState(option: string, value: any) {
        switch(name) {
            case AccountStateOptions.Source: 
                if(this.listState.accountSource)
                    return this.listState[value] || null;
                else
                    return null;
            default: 
                return null;
        }
    }
}
