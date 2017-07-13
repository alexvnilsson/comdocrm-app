import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';

import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AccountsService } from '../services/accounts.service';
import { Account } from '../models/accounts';
import * as account from './accounts.actions';

@Injectable()
export class AccountsEffects {
    @Effect()
    all$: Observable<Action> = this.actions$
        .ofType(account.AccountsActionTypes.LOAD)
        .startWith(new account.LoadAction())
        .debounceTime(300)
        .map(toPayload)
        .switchMap(() => {
            const nextLoad$ = this.actions$.ofType(account.AccountsActionTypes.LOAD).skip(1);

            return this.accounts.getAll()
                .map((accounts: Account[]) => new account.LoadSuccessAction(accounts));
        });

    @Effect()
    add$: Observable<Action> = this.actions$
        .ofType(account.AccountsActionTypes.ADD)
        .map((action: account.AddAction) => JSON.parse(JSON.stringify(action.payload)))
        .mergeMap(_account => 
            this.accounts.add(_account)
            .switchMap(result => 
                Observable.of({ type: '', payload: result })
            )
        );

    constructor(
        private actions$: Actions,
        private accounts: AccountsService
    ) {}
}