import { Action } from '@ngrx/store';
import { Account, AccountStatus } from '../../models/accounts';
import { AccountPersonOfInterest } from "app/sales/accounts/models/accounts";
import { UserTask } from "app/user-tasks";
import { User } from "app/common/users/user";
import { AccountLead } from '../../models/accounts/account-lead';

export const ActionTypes = {
    LOAD: 'ACCOUNTS_LOAD',
    LOAD_SUCCESS: 'ACCOUNTS_LOAD_SUCCESS',
    LOAD_STATUSES: 'ACCOUNTS_LOAD_STATUSES',
    LOAD_STATUSES_RESULT: 'ACCOUNTS_LOAD_STATUSES_RESULT',

    SELECT: 'ACCOUNTS_SELECT',

    LOAD_DETAILS_RESULT: 'ACCOUNTS_LOAD_DETAILS_RESULT',

    UPDATE: 'ACCOUNTS_UPDATE',

    IMPORT: 'ACCOUNTS_IMPORT',
    IMPORT_RESULT: 'ACCOUNTS_IMPORT_RESULT',

    ADD: 'ACCOUNTS_ADD',
    ADD_RESULT: 'ACCOUNTS_ADD_RESULT',

    UPDATE_MANAGER: 'ACCOUNTS_UPDATE_MANAGER',
    UPDATE_MANAGER_RESULT: 'ACCOUNTS_UPDATE_MANAGER_RESULT',

    ADD_STATUS: 'ACCOUNTS_ADD_STATUS',
    ADD_STATUS_RESULT: 'ACCOUNTS_ADD_STATUS_RESULT',
    DELETE_STATUS: 'ACCOUNTS_DELETE_STATUS',
    DELETE_STATUS_RESULT: 'ACCOUNTS_DELETE_STATUS_RESULT',

    ADD_PERSON_OF_INTEREST: 'ACCOUNTS_ADD_PERSON_OF_INTEREST',
    ADD_PERSON_OF_INTEREST_SUCCESS: 'ACCOUNTS_ADD_PERSON_OF_INTEREST_SUCCESS',
    UPDATE_PERSON_OF_INTEREST: 'ACCOUNTS_UPDATE_PERSON_OF_INTEREST',
    UPDATE_PERSON_OF_INTEREST_RESULT: 'ACCOUNTS_UPDATE_PERSON_OF_INTEREST_RESULT',
    DELETE_PERSON_OF_INTEREST: 'ACCOUNTS_DELETE_PERSON_OF_INTEREST',
    DELETE_PERSON_OF_INTEREST_SUCCESS: 'ACCOUNTS_DELETE_PERSON_OF_INTEREST_SUCCESS',

    ADD_STATUS_USER_TASK: 'ACCOUNTS_ADD_STATUS_USER_TASK',
    ADD_STATUS_USER_TASK_RESULT: 'ACCOUNTS_ADD_STATUS_USER_TASK_RESULT',
    DELETE_STATUS_USER_TASK: 'ACCOUNTS_DELETE_STATUS_USER_TASK',
    DELETE_STATUS_USER_TASK_RESULT: 'ACCOUNTS_DELETE_STATUS_USER_TASK_RESULT' 
}

export interface AccountAction extends Action {
  type: string;
  payload?: any;
}

export class LoadAction implements AccountAction {
    readonly type = ActionTypes.LOAD;

    constructor(public payload?: any) {}
}

export class SelectAction implements AccountAction {
    readonly type = ActionTypes.SELECT;

    constructor(public payload: string) {}
}

export class LoadDetailsResult implements AccountAction {
  readonly type = ActionTypes.LOAD_DETAILS_RESULT;

  constructor(public payload: Account) {}
}

export class LoadSuccessAction implements AccountAction {
    readonly type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: Account[]) {}
}

export class LoadStatusesAction implements AccountAction {
    readonly type = ActionTypes.LOAD_STATUSES;

    constructor(public payload: string) {}
}

export class LoadStatusesResult implements AccountAction {
    readonly type = ActionTypes.LOAD_STATUSES_RESULT;

    constructor(public payload: AccountStatus[]) {}
}

export class UpdateAction implements AccountAction {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload: Account | Account[]) {}
}

export class AddAction implements AccountAction {
    readonly type = ActionTypes.ADD;

    constructor(public payload: Account) {}
}

export class AddResult implements AccountAction {
    readonly type = ActionTypes.ADD_RESULT;

    constructor(public payload: {
        success: boolean,
        account: Account
    }) {}
}

export class ImportAction implements AccountAction {
    readonly type = ActionTypes.IMPORT;

    constructor(public payload: AccountLead) {}
}

export class ImportResult implements AccountAction {
    readonly type = ActionTypes.IMPORT_RESULT;

    constructor(public payload: { account: Account, lead: AccountLead }) {}
}

export class UpdateManagerAction implements AccountAction {
    readonly type = ActionTypes.UPDATE_MANAGER;

    constructor(public payload: { account: Account, user: User}) {}
}

export class UpdateManagerResultAction implements AccountAction {
    readonly type = ActionTypes.UPDATE_MANAGER_RESULT;

    constructor(public payload: { success: boolean, account: Account, user: User}) {}
}

export class AddStatusAction implements AccountAction {
    readonly type = ActionTypes.ADD_STATUS;

    constructor(public payload: {
        account: Account,
        status: AccountStatus
    }) {}
}

export class AddStatusResultAction implements AccountAction {
    readonly type = ActionTypes.ADD_STATUS_RESULT;

    constructor(public payload: {
        success: boolean,
        account: Account,
        status: AccountStatus
    }) {}
}

export class DeleteStatusAction implements AccountAction {
    readonly type = ActionTypes.DELETE_STATUS;

    constructor(public payload: {
        account: Account,
        status: AccountStatus
    }) {}
}

export class DeleteStatusResultAction implements AccountAction {
    readonly type = ActionTypes.DELETE_STATUS_RESULT;

    constructor(public payload: {
        success: boolean,
        account: Account,
        status: AccountStatus
    }) {}
}

export class AddPersonOfInterestAction implements AccountAction {
    readonly type = ActionTypes.ADD_PERSON_OF_INTEREST;

    constructor(public payload: {
        account: Account,
        person: AccountPersonOfInterest
    }) {}
}

export class AddPersonOfInterestSuccess implements AccountAction {
    readonly type = ActionTypes.ADD_PERSON_OF_INTEREST_SUCCESS;

    constructor(public payload: {
        account: Account,
        person: AccountPersonOfInterest
    }) {}
}

export class UpdatePersonOfInterestAction implements AccountAction {
  readonly type = ActionTypes.UPDATE_PERSON_OF_INTEREST;

  constructor(public payload: {
      account: Account,
      person: AccountPersonOfInterest
  }) {}
}

export class UpdatePersonOfInterestResult implements AccountAction {
  readonly type = ActionTypes.UPDATE_PERSON_OF_INTEREST_RESULT;

  constructor(public payload: {
      account: Account,
      person: AccountPersonOfInterest
  }) {}
}

export class DeletePersonOfInterestAction implements AccountAction {
    readonly type = ActionTypes.DELETE_PERSON_OF_INTEREST;

    constructor(public payload: {
        account: Account,
        person: AccountPersonOfInterest
    }) {}
}

export class DeletePersonOfInterestSuccessAction implements AccountAction {
    readonly type = ActionTypes.DELETE_PERSON_OF_INTEREST_SUCCESS;

    constructor(public payload: {
        account: Account,
        person: AccountPersonOfInterest
    }) {}
}

export class AddStatusUserTaskAction implements AccountAction {
    readonly type = ActionTypes.ADD_STATUS_USER_TASK;

    constructor(public payload: {
        account: Account,
        status: AccountStatus,
        userTask: UserTask
    }) {}
}

export class AddStatusUserTaskResultAction implements AccountAction {
    readonly type = ActionTypes.ADD_STATUS_USER_TASK_RESULT;

    constructor(public payload: {
        success: boolean,
        account: Account,
        status: AccountStatus,
        userTask: UserTask
    }) {}
}

export class DeleteStatusUserTaskAction implements AccountAction {
    readonly type = ActionTypes.DELETE_STATUS_USER_TASK;

    constructor(public payload: {
        account: Account,
        status: AccountStatus,
        userTask: UserTask
    }) {}
}

export class DeleteStatusUserTaskResultAction implements AccountAction {
    readonly type = ActionTypes.DELETE_STATUS_USER_TASK_RESULT;

    constructor(public payload: {
        success: boolean,
        account: Account,
        status: AccountStatus,
        userTask: UserTask
    }) {}
}