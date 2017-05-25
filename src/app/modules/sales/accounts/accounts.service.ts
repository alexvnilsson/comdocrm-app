import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Account } from './account';
import { AccountListView } from './list-view/account-list-view';

@Injectable()
export class AccountsService {
  private baseAddr: string = "http://localhost:5000/api/sales";

  constructor(private http: Http) { }

  getAll(callback: (accounts: Array<AccountListView>) => any) {
    this.http.get(`${this.baseAddr}/accounts`).subscribe((res: Response) => {
      let data = res.json() || null;

      if(data !== null)
        callback(data);
    });
  }

  getById(account: string, callback: (account: Account) => any) {
    this.http.get(`${this.baseAddr}/accounts/${account}`).subscribe((res: Response) => {
      let data = res.json() || null;

      if(data !== null)
        callback(data);
    });
  }
}
