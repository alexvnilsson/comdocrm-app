import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteTransitionAnimation, DoneLoadingTransitionAnimation } from 'app/common/ui/animations';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { UiState } from 'app/common/interfaces/ui-state.interface';

import { Account, AccountSource } from '../../models/accounts';

export interface AccountListState {
    accountSource?: AccountSource;
}

export const USER_STATE = {
    ACCOUNT_SOURCE: 'Sales_Accounts_Source'
};

@Component({
    selector: 'ccrm-sales-accounts-list-leads-view',
    templateUrl: './list-leads-view.component.html',
    styleUrls: ['./list-leads-view.component.scss'],
    animations: [RouteTransitionAnimation, DoneLoadingTransitionAnimation],
    host: {
        '[@routeTransition]': ''
    }
})
export class ListLeadsViewComponent implements OnInit {
    @Input() accounts: Account[];
    
    selectedAccount$: Observable<Account>;

    @Output() onModalOpen: EventEmitter<string> = new EventEmitter();
    @Input() modalOpen$: string = null;

    uiState: UiState = new UiState(true);

    listState: AccountListState = {
        accountSource: null
    };

    onAccountSourceChange: EventEmitter<AccountSource> = new EventEmitter();

    private onAccountSourceChangeListener: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        
    }

    uiOnComplete() {

    }

    uiOnError(error: Error) {
        this.uiState.onError(error);
    }

    onCreateAccount() {
        this.router.navigate([{ outlets: { 'account': [ 'create' ] } } ], { relativeTo: this.route });
    }

    onAccountClicked(account: Account, event: Event) {
        this.selectedAccount$ = Observable.of(account);

        this.onModalOpen.emit('accounts_leads_leadCard');

        return false;
    }
}
