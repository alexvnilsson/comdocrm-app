import { User } from 'app/common/users/user';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/take';

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/app.store';
import * as fromAccounts from '../store/accounts/accounts.reducer';
import * as fromUsers from 'app/common/users/store/users.reducer';
import * as fromLayout from 'app/common-ui/layout/layout.reducers';

import * as accountActions from '../store/accounts/accounts.actions';
import * as layoutActions from 'app/common-ui/layout/layout.actions';

import { AccountPersonOfInterest, Account, AccountStatus } from '../models/accounts';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserTask } from "app/user-tasks";

@Component({
    selector: 'ccrm-sales-accounts-details-selected',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ccrm-sales-accounts-details-view
            [account]="account$ | async"
            [statuses]="statuses$ | async"
            [users]="users$ | async"
            [modalOpen$]="modalOpen$ | async"
            (onModalOpen)="onModalOpened($event)"
            (onManagerUpdated)="onAccountManagerUpdated($event)"
            (onStatusAdded)="onStatusAdded($event)"
            (onStatusDeleted)="onStatusDeleted($event)"
            (onPersonOfInterestAdded)="onPersonOfInterestAdded($event)"
            (onPersonOfInterestDeleted)="onPersonOfInterestDeleted($event)"
            (onUserTaskAdded)="onUserTaskAdded($event)"
            (onUserTaskDeleted)="onUserTaskDeleted($event)"
        ></ccrm-sales-accounts-details-view>
    `
})
export class AccountDetailsSelectedContainer {
    actionsSubscription: Subscription;

    account$: Observable<Account>;
    statuses$: Observable<AccountStatus[]>;
    users$: Observable<User[]>;

    modalOpen$: Observable<string>;

    constructor(
      private store: Store<fromRoot.State>) {
        this.account$ = store.select(fromRoot.accountsState).select(fromAccounts.selected);
        this.statuses$ = store.select(fromRoot.accountsState).select(fromAccounts.statusesOfSelected);
        this.users$ = store.select(fromRoot.usersState).select(fromUsers.all);

        this.modalOpen$ = store.select(fromRoot.layoutState).select(fromLayout.openedModalName);
    }

    private onModalOpened(name: string) {
        if(name)
            this.store.dispatch(new layoutActions.OpenModalAction(name));
        else
            this.store.dispatch(new layoutActions.CloseModalAction());
    }

    private onAccountManagerUpdated(payload: { account: Account, user: User }) {
        if (payload && payload.account && payload.user) {
            this.store.dispatch(new accountActions.UpdateManagerAction(payload));
        }
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
        if(payload && payload.account && payload.person) {
            this.store.dispatch(new accountActions.AddPersonOfInterestAction(payload));
        }
    }

    private onPersonOfInterestDeleted(payload: {account: Account, person: AccountPersonOfInterest}) {
        if(payload && payload.account && payload.person) {
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
