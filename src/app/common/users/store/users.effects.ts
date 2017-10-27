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
import * as userActions from './users.actions';
import * as fromUsers from './users.reducer';

import { UsersService } from '../users.service';

@Injectable()
export class UsersEffects {
    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(userActions.ActionTypes.LOAD)
        .startWith(new userActions.LoadAction(null))
        .map(toPayload)
        .mergeMap(payload => {
            return this.usersService.getUsers()
            .map(users => new userActions.LoadResultAction(users));
        });

    constructor(
        private usersService: UsersService,
        private store$: Store<fromRoot.State>,
        private actions$: Actions
    ) {}
}
