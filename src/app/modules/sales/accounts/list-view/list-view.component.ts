import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'app/i18n/translate.service';
import { AccountsService } from '../accounts.service';
import { AccountSourcesService } from '../account-sources.service';
import { AccountListView } from './account-list-view';
import { Account, AccountSource } from '../account';
import { SwipeActions } from 'app/ui/mobile/swipe-events';
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
        private translate: TranslateService,
        private accountsService: AccountsService,
        private accountSourcesService: AccountSourcesService
    ) { }

    ngOnInit() {
        this.translate.getModuleTranslation('sales').subscribe(translate => {
            console.log("got module translation: ", translate);
        })

        this.accountsService.getAll(this.onAccountsLoad.bind(this));

        this.onAccountSourceChangeListener = this.onAccountSourceChange.subscribe(this.onAccountSourceChanged.bind(this));
    }

    /* Account events */

    onAccountsLoad(accounts: Array<Account>) {
        this.accounts = accounts;

        this.accountSources = this.accountSourcesService.getAllAccountSources(this.accounts);

        this.accountsService.getUserState(this.onUserStateLoaded.bind(this));
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
        if(state.Source) {
            this.accountSources.forEach((source: AccountSource) => {
                if(source.id == state.Source)
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

    /* End Account source methods */

    /* Mobile gesture events */

    onViewSwipeLeft() {

    }

    onSwipeRight() {

    }

    /* End Mobile gesture events */
}
