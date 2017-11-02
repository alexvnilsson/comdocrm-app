import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '.env';

import { RouterStateUrl } from 'common/ngrx/utils';

import { storeFreeze } from 'ngrx-store-freeze';

import * as layoutStore from 'app/common-ui/layout/layout.reducers';
import * as usersStore from 'app/common/users/store';
import * as accountsStore from 'app/sales/accounts/store/accounts';
import * as accountLeadsStore from 'app/sales/accounts/store/accounts/leads';
import * as productsStore from 'app/sales/products/store';

export interface State {
    layout: layoutStore.State;
    users: usersStore.fromUsers.State;
    accounts: accountsStore.fromAccounts.State;
    leads: accountLeadsStore.fromAccountLeads.State;
    products: productsStore.fromProducts.State;
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers = {
    layout: layoutStore.reducer,
    users: usersStore.fromUsers.reducer,
    accounts: accountsStore.fromAccounts.reducer,
    leads: accountLeadsStore.fromAccountLeads.reducer,
    products: productsStore.fromProducts.reducer,
    routerReducer: fromRouter.routerReducer
}

export function reducer(state: State, action: any) {
  return reducer(state, action);
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];

export const fromUsers = (state: State) => state.users;

export const fromAccounts = (state: State) => state.accounts;

export const fromLeads = (state: State) => state.leads;

export const fromLayout = (state: State) => state.layout;

export const fromProducts = (state: State) => state.products;