import 'rxjs/add/operator/map';

import { ActionReducer, Action } from '@ngrx/store';
import { AccountStatus, Account } from '../models/accounts';
import { createSelector } from 'reselect';
import { state } from '@angular/animations';
import { AccountPersonOfInterest } from "app/sales/accounts/models";

import * as accountsStore from './accounts.actions';
import * as accountPayloads from './accounts.payloads';

export interface State {
    loading: boolean;
    entities: Account[];
}

export const initialState: State = {
    loading: null,
    entities: []
};

export function reducer(state = initialState, action: accountsStore.AccountsActions) {
    switch(action.type) {
        case accountsStore.ActionTypes.LOAD_STATUSES: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case accountsStore.ActionTypes.SELECT: {
            return Object.assign({}, state, {
                selectedAccount: action.payload
            });
        }

        case accountsStore.ActionTypes.UPDATE: {
            if(action.payload instanceof Array) {
                // TODO: Update Array of Accounts.
            }
            else if (action.payload instanceof Account) {
                return Object.assign({}, state, {
                    entities: state.entities.map(account => account.id === action.payload.id ? action.payload : account)
                })
            }
        }

        case accountsStore.ActionTypes.ADD_STATUS_RESULT: {
            if(!action.payload.account)
                throw 'No working Account has been selected.';

            if(action.payload.status && action.payload.success) {
                return Object.assign({}, state, {
                    entities: state.entities.map(account => account.id === action.payload.account.id ? 
                        Object.assign({}, account, {
                            statuses: account.statuses.concat(action.payload.status)
                        })
                        : account
                    )
                });
            }

            return state;
        }

        case accountsStore.ActionTypes.DELETE_STATUS_RESULT: {
            if(!action.payload.account)
                throw 'No workign Account has been sleected.';

            if(action.payload.status && action.payload.success) {
                return Object.assign({}, state, {
                    entities: state.entities.map(account => account.id === action.payload.account.id ?
                        Object.assign({}, account, {
                            statuses: account.statuses.filter(status => status.id !== action.payload.status.id)
                        })
                        : account
                    )
                })
            }
        }

        case accountsStore.ActionTypes.ADD_PERSON_OF_INTEREST_SUCCESS: {
            if(!action.payload.account)
                throw 'No working Account has been selected.';

            let account = state.entities.find(account => account.id === action.payload.account.id);

            if(!account)
                throw 'Account was not found.';

            let accountAddPersonOfInterest = Object.assign([], account.peopleOfInterest, [ ...account.peopleOfInterest, 
                ...[ action.payload ]]);

            return Object.assign({}, state, {
                entities: state.entities.map(account => 
                    account.id == action.payload.account.id
                        ? Object.assign({}, account, { peopleOfInterest: accountAddPersonOfInterest })
                        : account)
            });
        }

        case accountsStore.ActionTypes.DELETE_PERSON_OF_INTEREST_SUCCESS: {
            if(!action.payload.account)
                throw 'No working Account has been selected.';

            let account = state.entities.find(account => account.id == action.payload.account.id);

            if (!account)
                throw 'Account was not found.';

            let removePersonOfInterest = account.peopleOfInterest.filter(person => person.id !== action.payload.status.id);

            return Object.assign({}, state, {
                entities: state.entities.map(account => account.id == action.payload.account.id ?
                    Object.assign({}, account, { peopleOfInterest: removePersonOfInterest })
                    : account)
            });
        }

        case accountsStore.ActionTypes.ADD_STATUS_USER_TASK_RESULT: {
            if(!action.payload.account || !action.payload.status)
                throw 'No working Account and/or AccountStatus has been selected.';

            let account: Account = action.payload.account;
            let status: AccountStatus = action.payload.status;

            if(action.payload.success) {
                return Object.assign({}, state, {
                    entities: state.entities.map(account => account.id == action.payload.account.id ?
                        Object.assign({}, account, {
                            statuses: 
                                account.statuses.map(status => status.id == action.payload.status.id ?
                                    Object.assign({}, status, {
                                        userTasks: status.userTasks.concat(action.payload.userTask)
                                    })
                                    : status
                                )
                            })
                        : account
                    )});
            }
            else {
                return state;
            }
        }

        case accountsStore.ActionTypes.DELETE_STATUS_USER_TASK_RESULT: {
            if(!action.payload.account || !action.payload.status)
                throw 'No working Account and/or AccountStatus has been selected.';

            let account: Account = action.payload.account;
            let status: AccountStatus = action.payload.status;

            if(action.payload.success) {
                let deleteUserTask = status.userTasks.filter(userTask => userTask.id != action.payload.userTask.id);

                return Object.assign({}, state, {
                    entities: state.entities.map(account => account.id == action.payload.account.id ?
                        Object.assign({}, account, { 
                            statuses:
                                account.statuses.map(status => status.id == action.payload.status.id ?
                                    Object.assign({}, status, { userTasks: deleteUserTask })
                                    : status
                                )
                            })
                        : account
                        
                    )
                });
            }
        }

        default: {
            return state;
        }
    }
}

export const allEntities = (state: State) => state.entities;

export const selectedAlias = (state: State) => state.selectedAccount;

export const selected = createSelector(allEntities, selectedAlias, (entities, selectedAlias) => {
    return entities.find(account => account.alias == selectedAlias) || null;
});

export const getLoading = (state: State) => state.loading;