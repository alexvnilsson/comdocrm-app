import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/take';

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/app.store';
import * as accountsReducer from '../store/accounts.reducer';
import * as account from '../store/accounts.actions';
import { Account } from '../models/accounts';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'ccrm-sales-accounts-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ccrm-ui-spinner *ngIf="loading$ | async"></ccrm-ui-spinner>
    
        <ccrm-sales-accounts-list-view [accounts]="accounts$ | async"></ccrm-sales-accounts-list-view>
    `
})
export class AccountsListContainerComponent {
    accounts$: Observable<Account[]>;
    loading$: Observable<boolean>;

    constructor(store: Store<fromRoot.State>) {
        this.accounts$ = store.select(fromRoot.getAccountsAll);
        this.loading$ = store.select(fromRoot.getAccountsLoading);
    }
}