import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/combineLatest';

import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/app.store';
import * as accountLeadsStore from '../store/accounts/leads';
import { Account } from '../models/accounts';
import * as fromLayout from 'app/common-ui/layout/layout.reducers';
import * as layout from 'app/common-ui/layout/layout.actions';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'ccrm-sales-account-leads-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `   
        <ccrm-ui-spinner *ngIf="loading$ | async"></ccrm-ui-spinner>
    
        <ccrm-sales-accounts-list-leads-view [accounts]="accountsSorted$ | async" [modalOpen$]="modalOpen$ | async" (onModalOpen)="onModalOpen($event, name)"></ccrm-sales-accounts-list-leads-view>
    `
})
export class AccountLeadsListContainer implements OnInit, OnDestroy {
    accounts$: Observable<Account[]>;
    accountsSorted$: Observable<Account[]>;

    loading$: Observable<boolean>;

    modalOpen$: Observable<string>;

    constructor(private store: Store<fromRoot.State>) {}

    ngOnInit() {
        this.store.dispatch(new accountLeadsStore.actions.SelectAction(null));

        this.accounts$ = this.store.select(fromRoot.leadsState).select(accountLeadsStore.fromAccountLeads.allEntities);

        this.accountsSorted$ = Observable.from(this.accounts$).map(accounts => {
                if(accounts && accounts.length > 0) {
                    return accounts.slice().sort((a, b) => b.dateModified < a.dateModified ? -1 : 1)
                }
                else {
                    return null;
                }
            }
        );
        
        this.loading$ = this.store.select(fromRoot.leadsState).select(accountLeadsStore.fromAccountLeads.getLoading);

        this.modalOpen$ = this.store.select(fromRoot.layoutState).select(fromLayout.openedModalName);
    }

    onModalOpen(name: string) {
        if(name)
            this.store.dispatch(new layout.OpenModalAction(name));
        else
            this.store.dispatch(new layout.CloseModalAction());
    }

    ngOnDestroy() {
        
    }
}