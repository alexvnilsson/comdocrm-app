import { Action } from '@ngrx/store';
import { AccountPersonOfInterest } from "app/sales/accounts/models";
import { UserTask } from "app/user-tasks";
import { User } from "app/common/users/user";

export const ActionTypes = {
    LOAD: 'USERS_LOAD',
    LOAD_RESULT: 'USERS_LOAD_RESULT'
};

export class LoadAction implements Action {
    readonly type = ActionTypes.LOAD;

    constructor(public payload: null) {}
}

export class LoadResultAction implements Action {
    readonly type = ActionTypes.LOAD_RESULT;

    constructor(public payload: User[]) {}
}