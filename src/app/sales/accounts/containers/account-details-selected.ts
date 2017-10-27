import { User } from 'app/common/users/user';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/take';

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/app.store';
import * as accountsStore from '../store/accounts';
import * as usersStore from 'app/common/users/store';
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
        <ccrm-sales-accounts-details-view
            [account]="account$ | async"
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
    users$: Observable<User[]>;

    modalOpen$: Observable<string>;

    constructor(
      private store: Store<fromRoot.State>,
      private userStore: Store<usersStore.fromUsers.State>) {
        this.account$ = store.select(fromRoot.getAccount);
        this.users$ = userStore.select(usersStore.fromUsers.all);

        this.modalOpen$ = this.store.select(fromRoot.layoutState).select(fromLayout.openedModalName)
    }

    private onModalOpened(name: string) {
        if(name)
            this.store.dispatch(new Layout.OpenModalAction(name));
        else
            this.store.dispatch(new Layout.CloseModalAction());
    }

    private onAccountManagerUpdated(payload: { account: Account, user: User }) {
        if (payload && payload.account && payload.user) {
            this.store.dispatch(new accountsStore.actions.UpdateManagerAction(payload));
        }
    }

    private onStatusAdded(payload: { account: Account, status: AccountStatus }) {
        if(payload && payload.account && payload.status) {
            this.store.dispatch(new accountsStore.actions.AddStatusAction(payload));
        }
    }

    private onStatusDeleted(payload: { account: Account, status: AccountStatus }) {
        if(payload && payload.account && payload.status) {
            this.store.dispatch(new accountsStore.actions.DeleteStatusAction(payload));
        }
    }

    private onPersonOfInterestAdded(payload: {account: Account, person: AccountPersonOfInterest}) {
        if(payload && payload.account && payload.person) {
            this.store.dispatch(new accountsStore.actions.AddPersonOfInterestAction(payload));
        }
    }

    private onPersonOfInterestDeleted(payload: {account: Account, person: AccountPersonOfInterest}) {
        if(payload && payload.account && payload.person) {
            this.store.dispatch(new accountsStore.actions.DeletePersonOfInterestAction(payload));
        }
    }

    private onUserTaskAdded(payload: {account: Account, status: AccountStatus, userTask: UserTask}) {
        if(payload && payload.account && payload.status && payload.userTask) {
            this.store.dispatch(new accountsStore.actions.AddStatusUserTaskAction(payload));
        }
    }

    private onUserTaskDeleted(payload: {account: Account, status: AccountStatus, userTask: UserTask}) {
        if (payload && payload.account && payload.status && payload.userTask) {
            this.store.dispatch(new accountsStore.actions.DeleteStatusUserTaskAction(payload));
        }
    }
}
