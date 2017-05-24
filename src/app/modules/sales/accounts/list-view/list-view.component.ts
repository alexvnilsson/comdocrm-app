import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountsService } from '../accounts.service';
import { Account } from '../account';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  accounts: Array<Account>;

  constructor(
    private router: Router,
    private accountsService: AccountsService
  ) { }

  ngOnInit() {
    this.accountsService.getAll(this.onAccountsLoad.bind(this));
  }

  onAccountsLoad(accounts: Array<Account>) {
    this.accounts = accounts;
  }

  onOpenAccount(account: string) {
    this.router.navigate([ 'sales/accounts', account ]);
  }
}
