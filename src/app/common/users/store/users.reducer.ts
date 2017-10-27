import "rxjs/add/operator/map";

import { ActionReducer, Action } from "@ngrx/store";
import { createSelector } from "reselect";
import { state } from "@angular/animations";
import { AccountPersonOfInterest } from "app/sales/accounts/models/accounts";

import * as userActions from "./users.actions";
import { User } from "app/common/users/user";

export interface State {
  loading: boolean;
  me: User;
  users: User[];
}

export const initialState: State = {
  loading: null,
  me: null,
  users: []
};

export function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case userActions.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case userActions.ActionTypes.LOAD_RESULT: {
      const users: User[] = action.payload as User[];

      return Object.assign({}, state, {
        loading: false,
        users: users
      });
    }

    case userActions.ActionTypes.MY_PROFILE_RESULT: {
      return Object.assign({}, state, {
        me: action.payload
      });
    }

    default: {
      return state;
    }
  }
}

export const usersState = (state: State) => state;

export const all = (state: State) => state.users;

export const profile = (state: State) => state.me;