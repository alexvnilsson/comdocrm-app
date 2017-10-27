import { Action } from '@ngrx/store';
import { AccountPersonOfInterest } from "app/sales/accounts/models/accounts";
import { UserTask } from "app/user-tasks";
import { User } from "app/common/users/user";

export const ActionTypes = {
    LOAD: 'USERS_LOAD',
    LOAD_RESULT: 'USERS_LOAD_RESULT',

    MY_PROFILE: 'USERS_MY_PROFILE',
    MY_PROFILE_RESULT: 'USERS_MY_PROFILE_RESULT'
};

export class LoadAction implements Action {
    readonly type = ActionTypes.LOAD;

    constructor(public payload: null) {}
}

export class LoadResultAction implements Action {
    readonly type = ActionTypes.LOAD_RESULT;

    constructor(public payload: User[]) {}
}

export class MyProfileAction implements Action {
    readonly type = ActionTypes.MY_PROFILE;

    constructor(public payload: null) {}
}

export class MyProfileResult implements Action {
    readonly type = ActionTypes.MY_PROFILE_RESULT;

    constructor(public payload: User) {}
}
