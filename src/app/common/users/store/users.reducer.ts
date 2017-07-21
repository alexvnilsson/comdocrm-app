import 'rxjs/add/operator/map';

import { ActionReducer, Action } from '@ngrx/store';
import { createSelector } from 'reselect';
import { state } from '@angular/animations';
import { AccountPersonOfInterest } from "app/sales/accounts/models/accounts";

import * as userActions from './users.actions';
import { User } from "app/common/users/user";

export interface State {
    loading: boolean;
    users: User[];
}

export const initialState: State = {
    loading: null,
    users: []
};

export function reducer(state = initialState, action: Action) {
    switch(action.type) {
        case userActions.ActionTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case userActions.ActionTypes.LOAD_RESULT: {
            return Object.assign({}, state, {
                loading: false,
                users: action.payload
            });
        }

        default: {
            return state;
        }
    }
}

export const all = (state: State) => state.users;