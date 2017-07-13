import { ActionReducer, Action } from '@ngrx/store';
import { AccountStatus, Account } from '../models/accounts';
import { AccountsActionTypes, AccountsActions } from './accounts.actions';
import { createSelector } from 'reselect';
import { state } from '@angular/animations';

export interface State {
    loading: boolean;
    aliases: string[];
    entities: { [id: string]: Account };
    selectedAccount: string | null;
}

export const initialState: State = {
    loading: null,
    aliases: [],
    entities: {},
    selectedAccount: null
};

export function reducer(state = initialState, action: AccountsActions) {
    switch(action.type) {
        case AccountsActionTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case AccountsActionTypes.LOAD_SUCCESS: {
            const accounts: Account[] = action.payload as Account[];
            const newAccounts =  accounts.filter(account => !state.entities[account.alias]);

            const newAccountIds = newAccounts.map(account => account.alias);
            const newAccountEntities = newAccounts.reduce((entities: { [id: string]: Account }, account: Account) => {
                return Object.assign(entities, {
                    [account.alias]: account
                });
            }, {});

            return {
                aliases: [ ...state.aliases, ...newAccountIds ],
                entities: Object.assign({}, state.entities, newAccountEntities),
                selectedAccount: state.selectedAccount,
                loading: false
            };
        }

        case AccountsActionTypes.SELECT: {
            return {
                aliases: state.aliases,
                entities: state.entities,
                selectedAccount: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const allEntities = (state: State) => state.entities;

export const allEntitiesAliases = (state: State) => state.aliases;

export const selectedAlias = (state: State) => state.selectedAccount;

export const selected = createSelector(allEntities, selectedAlias, (entities, selectedAlias) => {
    return entities[selectedAlias];
});

export const all = createSelector(allEntities, allEntitiesAliases, (entities, aliases) => {
    return aliases.map(alias => entities[alias]);
});

export const one = createSelector(allEntities, selectedAlias, (entities, alias) => {
    return entities[alias];
})

export const getLoading = (state: State) => state.loading;