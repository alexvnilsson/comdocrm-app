import { Action } from '@ngrx/store';
import { Account, AccountStatus } from '../models/accounts';
import { AccountPersonOfInterest } from "app/sales/accounts/models";
import * as Payloads from './accounts.payloads';
import { UserTask } from "app/user-tasks";

export const ActionTypes = {
    LOAD: 'ACCOUNTS_LOAD',
    LOAD_SUCCESS: 'ACCOUNTS_LOAD_SUCCESS',

    SELECT: 'ACCOUNTS_SELECT',

    UPDATE: 'ACCOUNTS_UPDATE',

    ADD: 'ACCOUNTS_ADD',
    ADD_SUCCESS: 'ACCOUNTS_ADD_SUCCESS',
    ADD_FAIL: 'ACCOUNTS_ADD_FAIL',

    ADD_PERSON_OF_INTEREST: 'ACCOUNTS_ADD_PERSON_OF_INTEREST',
    ADD_PERSON_OF_INTEREST_SUCCESS: 'ACCOUNTS_ADD_PERSON_OF_INTEREST_SUCCESS',
    DELETE_PERSON_OF_INTEREST: 'ACCOUNTS_DELETE_PERSON_OF_INTEREST',
    DELETE_PERSON_OF_INTEREST_SUCCESS: 'ACCOUNTS_DELETE_PERSON_OF_INTEREST_SUCCESS',

    ADD_STATUS_USER_TASK: 'ACCOUNTS_ADD_STATUS_USER_TASK',
    ADD_STATUS_USER_TASK_RESULT: 'ACCOUNTS_ADD_STATUS_USER_TASK_RESULT',
    DELETE_STATUS_USER_TASK: 'ACCOUNTS_DELETE_STATUS_USER_TASK',
    DELETE_STATUS_USER_TASK_RESULT: 'ACCOUNTS_DELETE_STATUS_USER_TASK_RESULT' 
}

export class LoadAction implements Action {
    readonly type = ActionTypes.LOAD;

    constructor(public payload?: any) {}
}

export class SelectAction implements Action {
    readonly type = ActionTypes.SELECT;

    constructor(public payload: string) {}
}

export class LoadSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: Account[]) {}
}

export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload: Account | Account[]) {}
}

export class AddAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: Account) {}
}

export class AddPersonOfInterestAction implements Action {
    readonly type = ActionTypes.ADD_PERSON_OF_INTEREST;

    constructor(public payload: {
        account: Account,
        person: AccountPersonOfInterest
    }) {}
}

export class AddPersonOfInterestSuccess implements Action {
    readonly type = ActionTypes.ADD_PERSON_OF_INTEREST_SUCCESS;

    constructor(public payload: {
        account: Account,
        person: AccountPersonOfInterest
    }) {}
}

export class DeletePersonOfInterestAction implements Action {
    readonly type = ActionTypes.DELETE_PERSON_OF_INTEREST;

    constructor(public payload: {
        account: Account,
        person: AccountPersonOfInterest
    }) {}
}

export class DeletePersonOfInterestSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_PERSON_OF_INTEREST_SUCCESS;

    constructor(public payload: {
        account: Account,
        person: AccountPersonOfInterest
    }) {}
}

export class AddStatusUserTaskAction implements Action {
    readonly type = ActionTypes.ADD_STATUS_USER_TASK;

    constructor(public payload: {
        account: Account,
        status: AccountStatus,
        userTask: UserTask
    }) {}
}

export class AddStatusUserTaskResultAction implements Action {
    readonly type = ActionTypes.ADD_STATUS_USER_TASK_RESULT;

    constructor(public payload: {
        success: boolean,
        account: Account,
        status: AccountStatus,
        userTask: UserTask
    }) {}
}

export class DeleteStatusUserTaskAction implements Action {
    readonly type = ActionTypes.DELETE_STATUS_USER_TASK;

    constructor(public payload: {
        account: Account,
        status: AccountStatus,
        userTask: UserTask
    }) {}
}

export class DeleteStatusUserTaskResultAction implements Action {
    readonly type = ActionTypes.DELETE_STATUS_USER_TASK_RESULT;

    constructor(public payload: {
        success: boolean,
        account: Account,
        status: AccountStatus,
        userTask: UserTask
    }) {}
}

export type AccountsActions = 
    LoadAction
    | SelectAction
    | LoadSuccessAction
    | AddAction