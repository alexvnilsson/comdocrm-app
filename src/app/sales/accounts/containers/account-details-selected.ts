import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/take';

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/app.store';
import * as accountsReducer from '../store/accounts.reducer';
import * as account from '../store/accounts.actions';
import * as Layout from 'app/common-ui/layout/layout.actions';
import { Account } from '../models/accounts';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as fromLayout from 'app/common-ui/layout/layout.reducers';

@Component({
    selector: 'ccrm-sales-accounts-details-selected',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ccrm-ui-spinner *ngIf="loading$ | async"></ccrm-ui-spinner>

        <ccrm-sales-accounts-details-view 
            [account]="account$ | async"
            [modalOpen$]="modalOpen$ | async"
            (onModalOpen)="onModalOpened($event, name)"
        ></ccrm-sales-accounts-details-view>
    `
})
export class AccountDetailsSelectedContainerComponent {
    actionsSubscription: Subscription;

    account$: Observable<Account>;
    modalOpen$: Observable<string>;

    constructor(private store: Store<fromRoot.State>) {
        this.account$ = store.select(fromRoot.getAccount);
        this.modalOpen$ = store.select(fromRoot.getModalOpen);
    }

    private onModalOpened(name: string) {
        this.store.dispatch(new Layout.OpenModalAction(name));
        
    }
}