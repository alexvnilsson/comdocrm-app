import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '.environments/environment';

import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromLayout from 'app/common-ui/layout/layout.reducers';

import * as usersStore from 'app/common/users/store';
import * as accountsStore from 'app/sales/accounts/store/accounts';
import * as accountLeadsStore from 'app/sales/accounts/store/accounts/leads';

export interface State {
    layout: fromLayout.State;
    users: usersStore.fromUsers.State;
    accounts: accountsStore.fromAccounts.State;
    leads: accountLeadsStore.fromAccountLeads.State;
}

const reducers = {
    layout: fromLayout.reducer,
    users: usersStore.fromUsers.reducer,
    accounts: accountsStore.fromAccounts.reducer,
    leads: accountLeadsStore.fromAccountLeads.reducer
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

export const getAccountsLoading = createSelector(accountsState, accountsStore.fromAccounts.getLoading);

export const getAccountsAll = createSelector(accountsState, accountsStore.fromAccounts.allEntities);

export const getAccount = createSelector(accountsState, accountsStore.fromAccounts.selected);

export const leadsState = (state: State) => state.leads;

// export const getAccountsAll = createSelector(accountsState, getAccountsAllIds, (entities, ids) => {
//     return ids.map(id => entities[id]);
// });

export const layoutState = (state: State) => state.layout;

export const getModalOpen = createSelector(layoutState, fromLayout.openedModalName);
