import { Action } from '@ngrx/store';
import { Account } from '../models/accounts';

export const AccountsActionTypes = {
    LOAD: 'ACCOUNTS_LOAD',
    LOAD_SUCCESS: 'ACCOUNTS_LOAD_SUCCESS',
    SELECT: 'ACCOUNTS_SELECT',
    ADD: 'ACCOUNTS_ADD',
    ADD_SUCCESS: 'ACCOUNTS_ADD_SUCCESS',
    ADD_FAIL: 'ACCOUNTS_ADD_FAIL'
}

export class LoadAction implements Action {
    readonly type = AccountsActionTypes.LOAD;

    constructor(public payload?: any) {}
}

export class SelectAction implements Action {
    readonly type = AccountsActionTypes.SELECT;

    constructor(public payload: string) {}
}

export class LoadSuccessAction implements Action {
    readonly type = AccountsActionTypes.LOAD_SUCCESS;

    constructor(public payload: Account[]) {}
}

export class AddAction implements Action {
    readonly type = AccountsActionTypes.ADD;

    constructor(public payload: Account) {}
}

export type AccountsActions = 
    LoadAction
    | SelectAction
    | LoadSuccessAction
    | AddAction