import { User } from './../../../common/users/user';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/combineLatest';

import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/app.store';
import * as fromAccounts from '../store/accounts';
import * as fromAccountLeads from '../store/accounts/leads';
import * as fromUsers from 'app/common/users/store';

import { Account, AccountLead } from '../models/accounts';
import * as fromLayout from 'app/common-ui/layout/layout.reducers';
import * as layout from 'app/common-ui/layout/layout.actions';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: "ccrm-sales-accounts-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
        <ccrm-ui-spinner *ngIf="loading$ | async"></ccrm-ui-spinner>

        <ccrm-sales-accounts-list-view
          [accounts]="accountsSorted$ | async"
          [accountsMine]="accountsMine$ | async"
          [leads]="leads$ | async"
          [modalOpen$]="modalOpen$ | async"
          (onModalOpen)="onModalOpen($event)"
          (onAccountImported)="onAccountImported($event)"></ccrm-sales-accounts-list-view>
    `
})
export class AccountsListContainer implements OnInit, OnDestroy {
  accounts$: Observable<Account[]>;
  accountsSorted$: Observable<Account[]>;
  accountsMine$: Observable<Account[]>;

  profile$: Observable<User>;

  leads$: Observable<AccountLead[]>;

  loading$: Observable<boolean>;

  modalOpen$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new fromAccounts.actions.SelectAction(null));

    this.accounts$ = this.store.select(fromRoot.getAccountsAll);

    this.accountsSorted$ = Observable.from(this.accounts$).map(accounts =>
      accounts
        .slice()
        .sort((a, b) => (b.dateModified < a.dateModified ? -1 : 1))
    );

    this.profile$ = this.store.select(fromRoot.usersState).select(fromUsers.fromUsers.profile);

    this.accountsMine$ = this.accounts$.mergeMap(a => 
      this.profile$.map(p => 
        a.filter(account => {
          if (account.manager && account.manager.user) {
            if (account.manager.user.id === p.id) {
              return account;
            }
          }
        })
      )
    );

    this.accountsMine$.subscribe(mine => console.log(mine));

    const leadsUnsorted = this.store
      .select(fromRoot.leadsState)
      .select(fromAccountLeads.fromAccountLeads.allEntities);

    this.leads$ = Observable.from(leadsUnsorted).map(accounts => {
      if (accounts && accounts.length > 0) {
        return accounts
          .slice()
          .sort((a, b) => (b.dateModified < a.dateModified ? -1 : 1));
      } else {
        return null;
      }
    });

    this.loading$ = this.store.select(fromRoot.getAccountsLoading);

    this.modalOpen$ = this.store
      .select(fromRoot.layoutState)
      .select(fromLayout.openedModalName);
  }

  onAccountImported(account: Account) {
    if (account) {
      this.store.dispatch(new fromAccounts.actions.ImportAction(account));
    }
  }

  onModalOpen(name: string) {
    if (name) {
      this.store.dispatch(new layout.OpenModalAction(name));
    } else {
      this.store.dispatch(new layout.CloseModalAction());
    }
  }

  ngOnDestroy() {}
}
