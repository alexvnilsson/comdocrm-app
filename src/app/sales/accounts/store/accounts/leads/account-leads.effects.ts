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

import { AccountLeadsService } from '../../../services';
import { Account } from '../../../models/accounts';
import * as fromAccountLeads from './account-leads.reducer';
import * as accountLeadActions from './account-leads.actions';

@Injectable()
export class AccountLeadsEffects {
    @Effect()
    all$: Observable<Action> = this.actions$
        .ofType(accountLeadActions.ActionTypes.LOAD)
        .startWith(new accountLeadActions.LoadAction())
        .debounceTime(300)
        .map(toPayload)
        .switchMap(() => {
            const nextLoad$ = this.actions$.ofType(accountLeadActions.ActionTypes.LOAD).skip(1);

            return this.accountLeadsService.getAll()
                .map((accounts: Account[]) => new accountLeadActions.LoadResult({
                    success: true,
                    accounts: accounts
                }));
        });

    constructor(
        private store$: Store<fromRoot.State>,
        private actions$: Actions,
        private accountLeadsService: AccountLeadsService
    ) {}
}