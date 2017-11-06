import { AccountPersonOfInterest, AccountStatus } from './../../models/accounts/accounts';
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

import { AccountsService, AccountUpdateResult } from '../../services/accounts.service';
import { Account, AccountLead, AccountStates } from '../../models/accounts';
import * as fromAccounts from './accounts.reducer';
import * as accountsActions from './accounts.actions';
import { AccountAction, ActionTypes } from './accounts.actions';

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
  loadDetails$: Observable<Action> = this.actions$
    .ofType(accountsActions.ActionTypes.SELECT)
    .withLatestFrom(this.store$)
    .debounceTime(500)
    .switchMap(([action, store]) => {
      if (action.payload != null) {
        return this.accountsService
          .getByAlias(action.payload)
          .map((account: Account) => new accountsActions.LoadDetailsResult(account))
      } else {
        return Observable.of({ type: 'NO_ACTION' });
      }
    });

  @Effect()
  loadStatuses$: Observable<Action> = this.actions$
    .ofType(accountsActions.ActionTypes.SELECT)
    .withLatestFrom(this.store$)
    .debounceTime(500)
    .filter(([action, state]) => action.payload != null)
    .switchMap(([action, state]) => this.accountsService.getStatuses(action.payload)
      .map((people: Array<AccountStatus>) => new accountsActions.LoadStatusesResult(people))
    );

  @Effect()
  add$: Observable<Action> = this.actions$
    .ofType(accountsActions.ActionTypes.ADD)
    .map((action: accountsActions.AddAction) => action.payload)
    .mergeMap(_account =>
      this.accountsService.add(Object.assign({}, _account, {
        state: AccountStates.Published
      }))
        .map(result =>
          new accountsActions.AddResult({
            success: true,
            account: result
          })
        )
    );

  @Effect()
  import$: Observable<Action> = this.actions$
    .ofType(accountsActions.ActionTypes.IMPORT)
    .map((action: accountsActions.ImportAction) => action.payload)
    .mergeMap(lead =>
      this.accountsService.import(lead)
        .map(result =>
          new accountsActions.ImportResult({
            account: Object.assign({}, lead, { id: result.id, alias: result.alias }),
            lead: lead
          })
        )
    );

  @Effect()
  updateManager$: Observable<Action> = this.actions$
    .ofType(accountsActions.ActionTypes.UPDATE_MANAGER)
    .map((action: accountsActions.UpdateManagerAction) => action.payload)
    .mergeMap(payload => {
      return this.accountsService.setManager(payload.account, payload.user.id)
        .map((result: AccountUpdateResult) =>
          new accountsActions.UpdateManagerResultAction({
            success: true,
            account: payload.account,
            user: payload.user
          })
        )
    });

  @Effect()
  addStatus$: Observable<Action> = this.actions$
    .ofType(accountsActions.ActionTypes.ADD_STATUS)
    .map((action: accountsActions.AddStatusAction) => action.payload)
    .mergeMap(payload => {
      let accountStatus = Object.assign({}, payload.status, {
        publicationDate: new Date()
      });

      return this.accountsService.addStatus(payload.account, accountStatus)
        .map((result: AccountUpdateResult) =>
          new accountsActions.AddStatusResultAction({
            success: true,
            account: payload.account,
            status: Object.assign({}, accountStatus, { id: result.id })
          })
        )
    });

  @Effect()
  deleteStatus$: Observable<Action> = this.actions$
    .ofType(accountsActions.ActionTypes.DELETE_STATUS)
    .map((action: accountsActions.DeleteStatusAction) => action.payload)
    .mergeMap(payload => {
      return this.accountsService.deleteStatus(payload.account, payload.status)
        .map((result: AccountUpdateResult) =>
          new accountsActions.DeleteStatusResultAction({
            success: true,
            account: payload.account,
            status: payload.status
          })
        )
    })

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
  updatePersonOfInterest$: Observable<Action> = this.actions$
    .ofType(accountsActions.ActionTypes.UPDATE_PERSON_OF_INTEREST)
    .map((action: accountsActions.UpdatePersonOfInterestAction) => action.payload)
    .mergeMap(payload => {
      return this.accountsService.updatePersonOfInterest(payload.account, payload.person)
        .map((result: AccountUpdateResult) => 
          new accountsActions.UpdatePersonOfInterestResult({
            account: payload.account,
            person: payload.person
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
    private store$: Store<fromAccounts.State>,
    private actions$: Actions<AccountAction>,
    private accountsService: AccountsService
  ) { }
}