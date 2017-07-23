import 'rxjs/add/operator/map';

import { ActionReducer, Action } from '@ngrx/store';
import { AccountStatus, Account } from '../../models/accounts';
import { createSelector } from 'reselect';
import { state } from '@angular/animations';
import { AccountPersonOfInterest } from "app/sales/accounts/models/accounts";

import * as accountsStore from './accounts.actions';

export interface State {
    loading: boolean;
    entities: Account[];
    selectedAccount: string | null;
}

export const initialState: State = {
    loading: null,
    entities: [],
    selectedAccount: null
};

export function reducer(state = initialState, action: accountsStore.AccountsActions) {
    switch(action.type) {
        case accountsStore.ActionTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case accountsStore.ActionTypes.LOAD_SUCCESS: {
            const accounts: Account[] = action.payload as Account[];
            const newAccounts =  accounts.filter(account => !state.entities[account.alias]);

            return {
                entities: [ ...state.entities, ...newAccounts ],
                selectedAccount: state.selectedAccount,
                loading: false
            };
        }

        case accountsStore.ActionTypes.SELECT: {
            return Object.assign({}, state, {
                selectedAccount: action.payload
            });
        }

        case accountsStore.ActionTypes.ADD_RESULT: {
            if(action instanceof accountsStore.AddResult) {
                if(action.payload && action.payload.success) {
                    return Object.assign({}, state, {
                        entities: state.entities.concat(action.payload.account)
                    })
                }
            }
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

        case accountsStore.ActionTypes.IMPORT_RESULT: {
            if(action instanceof accountsStore.ImportResult) {
                console.log(action);
                if(action.payload && action.payload.account && action.payload.lead) {
                    return Object.assign({}, state, {
                        entities: state.entities.concat(action.payload.account)
                    })
                }
            }
        }

        case accountsStore.ActionTypes.UPDATE_MANAGER_RESULT: {
            if(action.payload.account && action.payload.user) {
                return Object.assign({}, state, {
                    entities: state.entities.map(account => account.id === action.payload.account.id ?
                        Object.assign({}, account, {
                            manager: {
                                user: action.payload.user,
                                assigned: new Date(),
                                active: true,
                            }
                        })
                        : account 
                    )
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
                            dateModified: new Date(),
                            statuses: account.statuses.concat(action.payload.status).sort((a, b) => b.publicationDate < a.publicationDate ? -1 : 1)
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
                            statuses: account.statuses.filter(status => status.id !== action.payload.status.id).sort((a, b) => b.publicationDate < a.publicationDate ? -1 : 1)
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

            return Object.assign({}, state, {
                entities: state.entities.map(account => 
                    account.id == action.payload.account.id
                        ? Object.assign({}, account, {
                            dateModified: new Date(),
                            peopleOfInterest: account.peopleOfInterest.concat(action.payload.person)
                        })
                        : account)
            });
        }

        case accountsStore.ActionTypes.DELETE_PERSON_OF_INTEREST_SUCCESS: {
            if(!action.payload.account)
                throw 'No working Account has been selected.';

            let account = state.entities.find(account => account.id == action.payload.account.id);

            if (!account)
                throw 'Account was not found.';

            if(!action.payload.person)
                throw 'PersonOfInterest not set.';

            let removePersonOfInterest = account.peopleOfInterest.filter(person => person.id !== action.payload.person.id);

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