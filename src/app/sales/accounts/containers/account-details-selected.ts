import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/take';

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/app.store';
import * as accountsReducer from '../store/accounts.reducer';
import * as accountActions from '../store/accounts.actions';
import * as Layout from 'app/common-ui/layout/layout.actions';
import { AccountPersonOfInterest, Account, AccountStatus } from '../models/accounts';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as fromLayout from 'app/common-ui/layout/layout.reducers';
import { UserTask } from "app/user-tasks";

@Component({
    selector: 'ccrm-sales-accounts-details-selected',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ccrm-ui-spinner *ngIf="loading$ | async"></ccrm-ui-spinner>

        <ccrm-sales-accounts-details-view 
            [account]="account$ | async"
            [modalOpen$]="modalOpen$ | async"
            (onModalOpen)="onModalOpened($event)"
            (onStatusAdded)="onStatusAdded($event)"
            (onStatusDeleted)="onStatusDeleted($event)"
            (onPersonOfInterestAdded)="onPersonOfInterestAdded($event)"
            (onPersonOfInterestDeleted)="onPersonOfInterestDeleted($event)"
            (onUserTaskAdded)="onUserTaskAdded($event)"
            (onUserTaskDeleted)="onUserTaskDeleted($event)"
        ></ccrm-sales-accounts-details-view>
    `
})
export class AccountDetailsSelectedContainerComponent {
    actionsSubscription: Subscription;

    account$: Observable<Account>;
    modalOpen$: Observable<string>;

    constructor(private store: Store<fromRoot.State>) {
        this.account$ = store.select(fromRoot.getAccount);
        this.modalOpen$ = this.store.select(fromRoot.layoutState).select(fromLayout.openedModalName)
    }

    private onModalOpened(name: string) {
        if(name)
            this.store.dispatch(new Layout.OpenModalAction(name));
        else
            this.store.dispatch(new Layout.CloseModalAction());   
    }

    private onStatusAdded(payload: { account: Account, status: AccountStatus }) {
        if(payload && payload.account && payload.status) {
            this.store.dispatch(new accountActions.AddStatusAction(payload));
        }
    }

    private onStatusDeleted(payload: { account: Account, status: AccountStatus }) {
        if(payload && payload.account && payload.status) {
            this.store.dispatch(new accountActions.DeleteStatusAction(payload));
        }
    }

    private onPersonOfInterestAdded(payload: {account: Account, person: AccountPersonOfInterest}) {
        if(payload && payload.person) {
            this.store.dispatch(new accountActions.AddPersonOfInterestAction(payload));
        }
    }

    private onPersonOfInterestDeleted(payload: {account: Account, person: AccountPersonOfInterest}) {
        if(payload && payload.person) {
            this.store.dispatch(new accountActions.DeletePersonOfInterestAction(payload));
        }
    }

    private onUserTaskAdded(payload: {account: Account, status: AccountStatus, userTask: UserTask}) {
        if(payload && payload.account && payload.status && payload.userTask) {
            this.store.dispatch(new accountActions.AddStatusUserTaskAction(payload));
        }
    }

    private onUserTaskDeleted(payload: {account: Account, status: AccountStatus, userTask: UserTask}) {
        if (payload && payload.account && payload.status && payload.userTask) {
            this.store.dispatch(new accountActions.DeleteStatusUserTaskAction(payload));
        }
    }
}