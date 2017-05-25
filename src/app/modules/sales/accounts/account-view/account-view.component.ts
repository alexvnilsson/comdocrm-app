import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from '../accounts.service';
import { Account } from '../account';
import { AccountEditorComponent } from './account-editor/account-editor.component';

import { RouteTransitionAnimation } from 'app/ui/animations';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss'],
  animations: [ RouteTransitionAnimation ],
  host: {
    '[@routeTransition]': 'true'
  }
})
export class AccountViewComponent implements OnInit {
  @ViewChild('accountEditor') accountEditor: AccountEditorComponent;
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

  onEditAccount() {
    this.accountEditor.openModal();
  }
}
