import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Account } from './account';
import { AccountListView } from './list-view/account-list-view';
import { AuthHttp } from 'angular2-jwt';

export interface AccountUpdateResult {
  updated: boolean;
}

@Injectable()
export class AccountsService {
  private baseAddr: string = "http://localhost:5000/api/sales";

  public onAccountUpdate: EventEmitter<Account> = new EventEmitter();

  constructor(private http: AuthHttp) { }

  getAll(callback: (accounts: Array<AccountListView>) => any) {
    this.http.get(`${this.baseAddr}/accounts`).subscribe((res: Response) => {
      let data = res.json() || null;

      if(data !== null)
        callback(data);
    });
  }

  getByAny(accountQuery: string, callback: (account: Account) => any, errorCallback: (message?: string, code?: string) => any) {
    this.http.get(`${this.baseAddr}/accounts/${accountQuery}`)
      .map((res: Response) => res.json() || null)
      .subscribe(
        data => { callback(data); },
        err => { errorCallback(); });
  }

  getById(account: string, callback: (account: Account) => any, errorCallback: (message?: string, code?: string) => any) {
    this.getByAny(account, callback, errorCallback);
  }

  getBySlug(account: string, callback: (account: Account) => any, errorCallback: (message?: string, code?: string) => any) {
    this.getByAny(account, callback, errorCallback);
  }

  saveChanges(account: Account, callback: (result: AccountUpdateResult) => any) {
    this.http.post(`${this.baseAddr}/accounts/save/${account.id}`, account).subscribe((res: Response) => {
      let resultData: AccountUpdateResult = res.json() || null;

      if(resultData.updated == true)
        this.onAccountUpdate.next(account);

      callback({ updated: resultData.updated });
    })
  }
}
