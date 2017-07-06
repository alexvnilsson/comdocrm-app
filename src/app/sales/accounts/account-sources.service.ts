import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Account, AccountSource } from './accounts';

@Injectable()
export class AccountSourcesService {
    constructor() { }

    getAllAccountSources(accounts: Array<Account>): Observable<Array<AccountSource>> {
        return new Observable(observer => {
            let accountSources: Array<AccountSource> = [];

            if (accounts)
                accounts.forEach((account: Account) => {
                    if (account.source)
                        if(!this.isItemInArray(account.source, accountSources))
                            accountSources.push(account.source);
                });

            observer.next(accountSources);
        });
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
