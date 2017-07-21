import 'rxjs/add/operator/map';

import { ActionReducer, Action } from '@ngrx/store';
import { AccountStatus, Account, AccountLead } from '../../../models/accounts';
import { createSelector } from 'reselect';
import { state } from '@angular/animations';
import { AccountPersonOfInterest } from "app/sales/accounts/models/accounts";

import * as accountsStore from '../';
import * as accountLeadsActions from './account-leads.actions';

export interface State {
    loading: boolean;
    entities: AccountLead[];
    selected: AccountLead | null;
}

export const initialState: State = {
    loading: null,
    entities: [],
    selected: null
};

export function reducer(state = initialState, action: accountLeadsActions.AccountLeadsActions) {
    switch(action.type) {
        case accountLeadsActions.ActionTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case accountLeadsActions.ActionTypes.LOAD_RESULT: {
            if(action instanceof accountLeadsActions.LoadResult) {
                if(action.payload.success) {
                    return Object.assign({}, state, {
                        loading: false,
                        entities: action.payload.leads
                    })
                }
                else {
                    return Object.assign({}, state, {
                        loading: false,
                        entities: null
                    })
                }
            }
        }

        case accountLeadsActions.ActionTypes.SELECT: {
            if(action instanceof accountLeadsActions.SelectAction) {
                if(action.payload && action.payload.result) {
                    if(action.payload.success && action.payload.account) {
                        return Object.assign({}, state, {
                            selected: action.payload.account
                        });
                    }
                    else if(!action.payload.account) {
                        return Object.assign({}, state, {
                            selected: null
                        });
                    }
                }
                else if (action.payload && !action.payload.result && action.payload.accountAlias) {
                    let accountResult = state.entities.find(e => e.alias === action.payload.accountAlias);

                    if(accountResult) { 
                        return Object.assign({}, state, {
                            selected: accountResult
                        });
                    }
                }

                return Object.assign({}, state, {
                        selected: null
                    });
            }
        }

        // case accountsStore.actions.ActionTypes.IMPORT: {
        //     if(action instanceof accountsStore.actions.ImportAction) {
        //         if(action.payload && action.payload instanceof AccountLead) {
        //             return Object.assign({}, state, {
        //                 entities: state.entities.map(e => e.id == action.payload.alias ?
        //                     Object.assign({}, e, {
        //                         leadId: e.id
        //                     })
        //                 : e)
        //             })
        //         }
        //     }
        // }

        case accountsStore.actions.ActionTypes.IMPORT_RESULT: {
            if(action instanceof accountsStore.actions.ImportResult) {
                if (action.payload && action.payload.account && action.payload.lead) {
                    return Object.assign({}, state, {
                        entities: state.entities.map(e => e.id == action.payload.lead.id ?
                            Object.assign({}, e, {
                                isImported: true
                            })
                        : e)
                    })
                }
            }
        }

        default: {
            return state;
        }
    }
}

export const allEntities = (state: State) => state.entities;

export const selectedEntity = (state: State) => state.selected;

export const selected = createSelector(allEntities, selectedEntity, (entities, selected) => {
    return entities.find(account => account.alias === selected.alias) || null;
});

export const getLoading = (state: State) => state.loading;