import '@ngrx/core/add/operator/select';

import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as accountsReducer from '../store/accounts.reducer';
import * as account from '../store/accounts.actions';
import { Account } from '../models/accounts';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'ccrm-sales-accounts-details',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<ccrm-sales-accounts-details-selected></ccrm-sales-accounts-details-selected>`
})
export class AccountDetailsContainerComponent implements OnInit, OnDestroy {
    actionsSubscription: Subscription;

    account$: Observable<Account>;

    constructor(private store: Store<accountsReducer.State>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.actionsSubscription = this.route.params
            .select<string>('slug')
            .map(alias => new account.SelectAction(alias))
            .subscribe(this. store);
    }   

    ngOnDestroy() {
        if(this.actionsSubscription)
            this.actionsSubscription.unsubscribe();
    }
}