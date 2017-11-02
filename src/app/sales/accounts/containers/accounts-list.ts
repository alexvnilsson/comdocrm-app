import { User } from './../../../common/users/user';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/combineLatest';

import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/app.store';
import * as fromAccounts from '../store/accounts/accounts.reducer';
import * as fromAccountLeads from '../store/accounts/leads';
import * as fromUsers from 'app/common/users/store';

import * as accountActions from '../store/accounts/accounts.actions';

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
          [accountsOther]="accountsOther$ | async"
          [accountsMine]="accountsMine$ | async"
          [leads]="leads$ | async"
          [modalOpen$]="modalOpen$ | async"
          (onModalOpen)="onModalOpen($event)"
          (onAccountImported)="onAccountImported($event)"></ccrm-sales-accounts-list-view>
    `
})
export class AccountsListContainer implements OnInit, OnDestroy {
  accounts$: Observable<Account[]>;
  accountsMine$: Observable<Account[]>;
  accountsOther$: Observable<Account[]>;

  profile$: Observable<User>;

  leads$: Observable<AccountLead[]>;

  loading$: Observable<boolean>;

  modalOpen$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new accountActions.SelectAction(null));

    this.profile$ = this.store.select(fromRoot.usersState).select(fromUsers.fromUsers.profile);

    this.accounts$ = Observable.from(this.store.select(fromRoot.accountsState).select(fromAccounts.allaccounts).map(accounts =>
      accounts
        .slice()
        .sort((a, b) => (b.dateModified < a.dateModified ? -1 : 1))
    ));

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

    this.accountsOther$ = this.accounts$.mergeMap(a => 
      this.profile$.map(p => 
        a.filter(account => {
          if (account.manager && account.manager.user) {
            if (account.manager.user.id !== p.id) {
              return account;
            }
          }
          else if (!account.manager || !account.manager.user) {
            return account;
          }
        })
      )
    );

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

    this.loading$ = this.store.select(fromRoot.accountsState).select(fromAccounts.getLoading);

    this.modalOpen$ = this.store
      .select(fromRoot.layoutState)
      .select(fromLayout.openedModalName);
  }

  onAccountImported(account: Account) {
    if (account) {
      this.store.dispatch(new accountActions.ImportAction(account));
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
