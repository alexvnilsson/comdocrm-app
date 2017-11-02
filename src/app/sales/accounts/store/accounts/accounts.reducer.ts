import { User } from './../../../../common/users/user';
import 'rxjs/add/operator/map';

import { ActionReducer, Action, Store } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AccountStatus, Account } from '../../models/accounts';
import { createSelector } from 'reselect';
import { state } from '@angular/animations';
import { AccountPersonOfInterest } from "app/sales/accounts/models/accounts";

import * as accountsStore from './accounts.actions';
import * as usersStore from 'app/common/users/store';

import * as rootStore from 'app/app.store';

export interface State {
  loading: boolean;

  accounts: Account[];
  statuses: AccountStatus[];
  peopleOfInterest: AccountPersonOfInterest[];

  selectedAccount: string;
}

export const initialState: State = {
  loading: null,

  accounts: [],
  statuses: [],
  peopleOfInterest: [],

  selectedAccount: null
};

export function reducer(state = initialState, action: accountsStore.AccountAction) {
  switch (action.type) {
    case accountsStore.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case accountsStore.ActionTypes.LOAD_SUCCESS: {
      const accounts: Account[] = action.payload as Account[];
      const newAccounts = accounts.filter(account => !state.accounts[account.alias]);

      return Object.assign({}, state, {
        accounts: [...state.accounts, ...newAccounts],
        selectedAccount: state.selectedAccount,
        loading: false
      });
    }

    case accountsStore.ActionTypes.SELECT: {
      return Object.assign({}, state, {
        selectedAccount: action.payload
      });
    }

    case accountsStore.ActionTypes.LOAD_DETAILS_RESULT: {
      if (action && action.payload) {
        let account: Account = action.payload;

        let accountsUpdated = state.accounts.map(a => {
          if (account.id === a.id) {
            return account;
          } else {
            return a;
          }
        });

        return Object.assign({}, state, {
          accounts: accountsUpdated
        });
      } else {
        return state;
      }
    }

    case accountsStore.ActionTypes.LOAD_STATUSES_RESULT: {
      if (action && action.payload) {
        let statuses: AccountStatus[] = action.payload;
        let newStatuses = statuses.filter(s => !state.statuses.filter(s2 => s.id === s2.id).length);

        return Object.assign({}, state, {
          statuses: [...state.statuses, ...newStatuses]
        });
      }
    }

    case accountsStore.ActionTypes.ADD_RESULT: {
      if (action instanceof accountsStore.AddResult) {
        if (action.payload && action.payload.success) {
          return Object.assign({}, state, {
            accounts: state.accounts.concat(action.payload.account)
          })
        }
      }
    }

    case accountsStore.ActionTypes.UPDATE: {
      if (action.payload instanceof Array) {
        // TODO: Update Array of Accounts.
      }
      else if (action.payload instanceof Account) {
        return Object.assign({}, state, {
          accounts: state.accounts.map(account => account.id === action.payload.id ? action.payload : account)
        })
      }
    }

    case accountsStore.ActionTypes.IMPORT_RESULT: {
      if (action instanceof accountsStore.ImportResult) {
        if (action.payload && action.payload.account && action.payload.lead) {
          return Object.assign({}, state, {
            accounts: state.accounts.concat(action.payload.account)
          })
        }
      }
    }

    case accountsStore.ActionTypes.UPDATE_MANAGER_RESULT: {
      if (action.payload.account && action.payload.user) {
        return Object.assign({}, state, {
          accounts: state.accounts.map(account => account.id === action.payload.account.id ?
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
      if (!action.payload.account)
        throw 'No working Account has been selected.';

      if (action.payload.status && action.payload.success) {
        let newStatus: AccountStatus = Object.assign({}, action.payload.status, {
          accountAlias: action.payload.account.alias
        });

        return Object.assign({}, state, {
          accounts: state.accounts.map(account => {
            if (account.id === action.payload.account.id) {
              return Object.assign({}, account, {
                dateModified: new Date()
              });
            } else {
              return account;
            }
          }),
          statuses: [...state.statuses, newStatus]
        });
      }

      return state;
    }

    case accountsStore.ActionTypes.DELETE_STATUS_RESULT: {
      if (!action.payload.account)
        throw 'No working Account has been sleected.';

      if (action.payload.status && action.payload.success) {
        return Object.assign({}, state, {
          statuses: state.statuses.filter(status => status.id !== action.payload.status.id)
        });
      }
    }

    case accountsStore.ActionTypes.ADD_PERSON_OF_INTEREST_SUCCESS: {
      if (!action.payload.account)
        throw 'No working Account has been selected.';

      let account = state.accounts.find(account => account.id === action.payload.account.id);

      if (!account)
        throw 'Account was not found.';

      return Object.assign({}, state, {
        accounts: state.accounts.map(account =>
          account.id == action.payload.account.id
            ? Object.assign({}, account, {
              dateModified: new Date(),
              peopleOfInterest: account.peopleOfInterest.concat(action.payload.person)
            })
            : account)
      });
    }

    case accountsStore.ActionTypes.DELETE_PERSON_OF_INTEREST_SUCCESS: {
      if (!action.payload.account)
        throw 'No working Account has been selected.';

      let account = state.accounts.find(account => account.id == action.payload.account.id);

      if (!account)
        throw 'Account was not found.';

      if (!action.payload.person)
        throw 'PersonOfInterest not set.';

      let removePersonOfInterest = account.peopleOfInterest.filter(person => person.id !== action.payload.person.id);

      return Object.assign({}, state, {
        accounts: state.accounts.map(account => account.id == action.payload.account.id ?
          Object.assign({}, account, { peopleOfInterest: removePersonOfInterest })
          : account)
      });
    }

    case accountsStore.ActionTypes.ADD_STATUS_USER_TASK_RESULT: {
      if (!action.payload.account || !action.payload.status)
        throw 'No working Account and/or AccountStatus has been selected.';

      let account: Account = action.payload.account;
      let status: AccountStatus = action.payload.status;

      if (action.payload.success) {
        return Object.assign({}, state, {
          accounts: state.accounts.map(account => account.id == action.payload.account.id ?
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
          )
        });
      }
      else {
        return state;
      }
    }

    case accountsStore.ActionTypes.DELETE_STATUS_USER_TASK_RESULT: {
      if (!action.payload.account || !action.payload.status)
        throw 'No working Account and/or AccountStatus has been selected.';

      let account: Account = action.payload.account;
      let status: AccountStatus = action.payload.status;

      if (action.payload.success) {
        let deleteUserTask = status.userTasks.filter(userTask => userTask.id != action.payload.userTask.id);

        return Object.assign({}, state, {
          accounts: state.accounts.map(account => account.id == action.payload.account.id ?
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

export const allaccounts = (state: State) => state.accounts;

export const statuses = (state: State) => state.statuses;

export const selectedAlias = (state: State) => state.selectedAccount;

export const selected = createSelector(allaccounts, selectedAlias, (accounts, selectedAlias) => {
  return accounts.filter(account => account.alias == selectedAlias)[0] || null;
});

export const statusesOfSelected = createSelector(statuses, selectedAlias, (statuses, selectedAlias) => {
  let _statuses = statuses.filter(s => s.accountAlias === selectedAlias) || null;

  if (_statuses === null) {
    return [];
  }

  return _statuses.sort((a, b) => (b.publicationDate < a.publicationDate ? -1 : 1));
});

export const getLoading = (state: State) => state.loading;