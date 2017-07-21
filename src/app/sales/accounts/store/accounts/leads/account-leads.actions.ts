import { Action } from '@ngrx/store';
import { Account, AccountStatus } from '../../../models/accounts';
import { AccountPersonOfInterest, AccountLead } from "app/sales/accounts/models/accounts";
import { UserTask } from "app/user-tasks";
import { User } from "app/common/users/user";

export const ActionTypes = {
    LOAD: 'ACCOUNT_LEADS_LOAD',
    LOAD_RESULT: 'ACCOUNTS_LEAD_LOAD_RESULT',

    SELECT: 'ACCOUNT_LEADSS_SELECT'
}

export class LoadAction implements Action {
    readonly type = ActionTypes.LOAD;

    constructor() {}
}

export class LoadResult implements Action {
    readonly type = ActionTypes.LOAD_RESULT;

    constructor(public payload: {
        success: boolean,
        leads: AccountLead[]
    }) {}
}

export class SelectAction implements Action {
    readonly type = ActionTypes.SELECT;

    constructor(public payload: {
        result: boolean,
        success?: boolean,
        accountAlias?: string,
        account?: Account
    }) {}

    public static Found(account: Account, alias?: string): SelectAction {
        return new SelectAction({
            result: true,
            success: true,
            account: account,
            accountAlias: alias
        });
    }

    public static NoResult(): SelectAction {
        return new SelectAction({
            result: true,
            success: true,
            accountAlias: null,
            account: null
        });
    }

    public static NotFound(): SelectAction {
        return new SelectAction({
            result: true,
            success: false,
            account: null,
            accountAlias: null
        });
    }
}

export type AccountLeadsActions = 
    LoadAction
    | SelectAction