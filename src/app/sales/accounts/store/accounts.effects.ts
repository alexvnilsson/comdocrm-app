import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';

import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as fromRoot from 'app/app.store';

import { AccountsService, AccountUpdateResult } from '../services/accounts.service';
import { Account } from '../models/accounts';
import * as fromAccounts from './accounts.reducer';
import * as accountsActions from './accounts.actions';

@Injectable()
export class AccountsEffects {
    @Effect()
    all$: Observable<Action> = this.actions$
        .ofType(accountsActions.ActionTypes.LOAD)
        .startWith(new accountsActions.LoadAction())
        .debounceTime(300)
        .map(toPayload)
        .switchMap(() => {
            const nextLoad$ = this.actions$.ofType(accountsActions.ActionTypes.LOAD).skip(1);

            return this.accountsService.getAll()
                .map((accounts: Account[]) => new accountsActions.LoadSuccessAction(accounts));
        });

    @Effect()
    add$: Observable<Action> = this.actions$
        .ofType(accountsActions.ActionTypes.ADD)
        .map((action: accountsActions.AddAction) => action.payload)
        .mergeMap(_account => 
            this.accountsService.add(_account)
            .switchMap(result => 
                Observable.of({ type: '', payload: result })
            )
        );

    @Effect()
    addPersonOfInterest$: Observable<Action> = this.actions$
        .ofType(accountsActions.ActionTypes.ADD_PERSON_OF_INTEREST)
        .map((action: accountsActions.AddPersonOfInterestAction) => action.payload)
        .mergeMap(payload => {
                return this.accountsService.addPersonOfInterest(payload.account, payload.person)
                .map((result: AccountUpdateResult) => 
                    new accountsActions.AddPersonOfInterestSuccess({
                        account: payload.account,
                        person: Object.assign({}, payload.person, { id: result.id })
                    })
                )
        });

    @Effect()
    deletePersonOfInterest$: Observable<Action> = this.actions$
        .ofType(accountsActions.ActionTypes.DELETE_PERSON_OF_INTEREST)
        .map((action: accountsActions.DeletePersonOfInterestAction) => action.payload)
        .mergeMap(payload => {
            return this.accountsService.deletePersonOfInterest(payload.account, payload.person)
            .map((result: AccountUpdateResult) => 
                new accountsActions.DeletePersonOfInterestSuccessAction({
                    account: payload.account,
                    person: payload.person
                })
            )
        });

    @Effect()
    addStatusUserTask$: Observable<Action> = this.actions$
        .ofType(accountsActions.ActionTypes.ADD_STATUS_USER_TASK)
        .map((action: accountsActions.AddStatusUserTaskAction) => action.payload)
        .mergeMap(payload => {
            return this.accountsService.addUserTask(payload.account, payload.status, payload.userTask)
            .map((result: AccountUpdateResult) =>
                new accountsActions.AddStatusUserTaskResultAction({
                    success: true,
                    account: payload.account,
                    status: payload.status,
                    userTask: Object.assign({}, payload.userTask, { id: result.id })
                }))
        });

    @Effect()
    deleteStatusUSerTask$: Observable<Action> = this.actions$
        .ofType(accountsActions.ActionTypes.DELETE_STATUS_USER_TASK)
        .map((action: accountsActions.DeleteStatusUserTaskAction) => action.payload)
        .mergeMap(payload => {
            return this.accountsService.deleteUserTask(payload.account, payload.status, payload.userTask)
            .map((result: AccountUpdateResult) =>
                new accountsActions.DeleteStatusUserTaskResultAction({
                    success: true,
                    account: payload.account,
                    status: payload.status,
                    userTask: payload.userTask
                })
            )
        })

    constructor(
        private store$: Store<fromRoot.State>,
        private actions$: Actions,
        private accountsService: AccountsService
    ) {}
}