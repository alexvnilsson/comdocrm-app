import 'rxjs/add/operator/take';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Account, AccountLead } from '../models/accounts';

import * as fromRoot from 'app/app.store';
import * as accountLeadsStore from '../store/accounts/leads';
import * as accountsStore from '../store/accounts';

import * as fromLayout from 'app/common-ui/layout/layout.reducers';
import * as layout from 'app/common-ui/layout/layout.actions';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'ccrm-sales-account-leads-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ccrm-ui-spinner *ngIf="loading$ | async"></ccrm-ui-spinner>

        <ccrm-sales-accounts-list-leads-view
        [leads]="leads$ | async"
        [modalOpen$]="modalOpen$ | async"
        (onAccountImported)="onAccountImported($event)"
        (onModalOpen)="onModalOpen($event)">
        </ccrm-sales-accounts-list-leads-view>
    `
})
export class AccountLeadsListContainer implements OnInit, OnDestroy {
    leads$: Observable<AccountLead[]>;

    loading$: Observable<boolean>;

    modalOpen$: Observable<string>;

    constructor(private store: Store<fromRoot.State>) {}

    ngOnInit() {
        this.store.dispatch(new accountLeadsStore.actions.SelectAction(null));

        let leadsUnsorted = this.store.select('leads').select(accountLeadsStore.fromAccountLeads.allEntities);

        this.leads$ = Observable.from(leadsUnsorted).map(accounts => {
                if (accounts && accounts.length > 0) {
                    return accounts.slice().sort((a, b) => b.dateModified < a.dateModified ? -1 : 1);
                } else {
                    return null;
                }
            }
        );

        this.loading$ = this.store.select('leads').select(accountLeadsStore.fromAccountLeads.getLoading);

        this.modalOpen$ = this.store.select('layout').select(fromLayout.openedModalName);
    }

    onAccountImported(account: Account) {
        if (account) {
            this.store.dispatch(new accountsStore.actions.ImportAction(account));
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
