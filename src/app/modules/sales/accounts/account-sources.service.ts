import { Injectable } from '@angular/core';
import { Account, AccountSource } from './account';

@Injectable()
export class AccountSourcesService {
    constructor() { }

    getAllAccountSources(accounts: Array<Account>): Array<AccountSource> {
        let accountSources: Array<AccountSource> = [];

        if (accounts)
            accounts.forEach((account: Account) => {
                if (account.source)
                    if(!this.isItemInArray(account.source, accountSources))
                        accountSources.push(account.source);
            });

        return accountSources;
    }

    private isItemInArray(value: AccountSource, array: Array<AccountSource>) {
        let inArray: boolean = false;

        array.forEach((_value: AccountSource) => {
            if(value.id == _value.id)
                inArray = true;
        });

        return inArray;
    }

}
