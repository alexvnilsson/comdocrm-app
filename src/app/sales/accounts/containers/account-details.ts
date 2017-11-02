import { User } from 'app/common/users/user';

import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/app.store';
import * as fromAccounts from '../store/accounts/accounts.reducer';
import * as fromUsers from 'app/common/users/store/users.reducer';
import { Account } from '../models/accounts';

import * as accountActions from '../store/accounts/accounts.actions';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ccrm-sales-accounts-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ccrm-sales-accounts-details-selected></ccrm-sales-accounts-details-selected>`
})
export class AccountDetailsContainer implements OnInit, OnDestroy {
  actionsSubscription: Subscription;

  account$: Observable<Account>;
  users$: Observable<User[]>;

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.actionsSubscription = this.route.params.subscribe(params => {
      if (params['slug']) {
        this.store.dispatch(new accountActions.SelectAction(params['slug']));
      }
    });

    this.users$ = this.store.select(fromRoot.fromUsers).select(fromUsers.all);
  }

  ngOnDestroy() {
    if (this.actionsSubscription) {
      this.actionsSubscription.unsubscribe();
    }
  }
}
