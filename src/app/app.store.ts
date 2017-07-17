import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '.environments/environment';

import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromLayout from 'app/common-ui/layout/layout.reducers';
import * as fromAccounts from 'app/sales/accounts/store/accounts.reducer';
import * as fromUsers from 'app/common/users/users.reducer';

export interface State {
    accounts: fromAccounts.State;
    layout: fromLayout.State;
    users: fromUsers.State;
}

const reducers = {
    accounts: fromAccounts.reducer,
    layout: fromLayout.reducer,
    users: fromUsers.reducer
}

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: State, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

//export const layoutState = (state: State) => state.layout;

export const usersState = (state: State) => state.users;

export const accountsState = (state: State) => state.accounts;

export const getAccountsLoading = createSelector(accountsState, fromAccounts.getLoading);

export const getAccountsAll = createSelector(accountsState, fromAccounts.allEntities);

export const getAccount = createSelector(accountsState, fromAccounts.selected);

// export const getAccountsAll = createSelector(accountsState, getAccountsAllIds, (entities, ids) => {
//     return ids.map(id => entities[id]);
// });

export const layoutState = (state: State) => state.layout;

export const getModalOpen = createSelector(layoutState, fromLayout.openedModalName);
