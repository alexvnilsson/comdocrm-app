import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from '../accounts.service';
import { AccountListView } from './account-list-view';

import { RouteTransitionAnimation } from 'app/ui/animations';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  animations: [ RouteTransitionAnimation ],
  host: {
    '[@routeTransition]': 'true'
  }
})
export class ListViewComponent implements OnInit {
  accounts: Array<AccountListView>;

  constructor(
    private router: Router,
    private accountsService: AccountsService
  ) { }

  ngOnInit() {
    this.accountsService.getAll(this.onAccountsLoad.bind(this));
  }

  onAccountsLoad(accounts: Array<AccountListView>) {
    this.accounts = accounts;
  }

  onOpenAccount(accountId: string) {
    this.router.navigate([ 'sales/accounts', accountId ]);
  }
}
