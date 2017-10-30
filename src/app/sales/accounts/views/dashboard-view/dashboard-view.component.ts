import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { Account } from '../../models/accounts';
import { UiState } from 'app/common/interfaces';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import * as fromRoot from 'app/app.store';
import * as fromAccounts from 'app/sales/accounts/store/accounts/accounts.reducer';
import { Router } from "@angular/router";

@Component({
    selector: 'ccrm-dashboard-accounts',
    templateUrl: './dashboard-view.component.html',
    styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit, OnDestroy {
    accounts$: Observable<Array<Account>>;

    constructor(
        private store$: Store<fromRoot.State>,
        private router: Router
    ) {}

    ngOnInit() {
        this.accounts$ = this.store$
        .select(fromRoot.accountsState)
        .select(fromAccounts.allaccounts)
        .map(a => 
            a.filter(_a => _a.isManager));
    }

    onAccountClicked(account: Account) {
        if(account && account.alias) {
            this.router.navigate([ '/', 'sales', 'accounts', account.alias ]);
        }
    }

    ngOnDestroy() {

    }
}
