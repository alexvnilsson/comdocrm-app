import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Account, AccountStatus, AccountStatusMetadata } from './account';
import { AccountListView } from './list-view/account-list-view';
import { AuthHttp } from 'angular2-jwt';

export interface AccountUpdateResult {
    updated: boolean;
}

@Injectable()
export class AccountsService {
    private baseAddr: string = "http://localhost:5000/api/sales";

    public onAccountUpdate: EventEmitter<Account> = new EventEmitter();

    _accountList: Array<Account> = null;

    constructor(private http: AuthHttp) { }

    getAll(callback: (accounts: Array<Account>) => any) {
        if(this._accountList === null) {
            this.http.get(`${this.baseAddr}/accounts`).subscribe((res: Response) => {
                let accountsResult: Array<Account> = res.json() || null;

                if (accountsResult !== null) {
                    this._accountList = accountsResult;

                    callback(this._accountList);
                }
            });
        } else {
            callback(this._accountList);
        }
    }

    getByAny(accountQuery: string, callback: (account: Account) => any, errorCallback: (message?: string, code?: string) => any) {
        this.http.get(`${this.baseAddr}/accounts/${accountQuery}`)
            .map((res: Response) => res.json() || null)
            .subscribe(
            data => { callback(data); },
            err => { errorCallback(); });
    }

    getById(account: string, callback: (account: Account) => any, errorCallback?: (message?: string, code?: string) => any) {
        this.getByAny(account, callback, errorCallback);
    }

    getBySlug(account: string, callback: (account: Account) => any, errorCallback?: (message?: string, code?: string) => any) {
        this.getByAny(account, callback, errorCallback);
    }

    addStatusToAccount(account: Account, status: AccountStatus, callback: (result: AccountUpdateResult) => any) {
        this.http.post(`${this.baseAddr}/accounts/status/add/${account.id}`, status).subscribe((res: Response) => {
            let resultData: AccountUpdateResult = res.json() || null;

            if(resultData != null) {
                callback({ updated: resultData.updated });
            }
      });
    }

    saveChanges(account: Account, callback: (result: AccountUpdateResult) => any) {
        this.http.post(`${this.baseAddr}/accounts/save/${account.id}`, account).subscribe((res: Response) => {
            let resultData: AccountUpdateResult = res.json() || null;

            if (resultData != null) {
                if (resultData.updated == true)
                    this.onAccountUpdate.next(account);

                callback({ updated: resultData.updated });
            }
        })
    }
}
