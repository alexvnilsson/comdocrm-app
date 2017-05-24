import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from '../accounts.service';
import { Account } from '../account';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {
  account: Account;

  constructor(
    private activatedRouter: ActivatedRoute,
    private accountsService: AccountsService
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      let accountId = params.id;

      this.accountsService.getById(accountId, this.onAccountLoad.bind(this));
    });
  }

  onAccountLoad(account: Account) {
    this.account = account;
  }
}
