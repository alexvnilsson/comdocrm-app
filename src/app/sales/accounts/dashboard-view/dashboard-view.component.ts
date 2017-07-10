import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { Account } from '../accounts';
import { UiState } from 'app/common/interfaces';

@Component({
    selector: 'ccrm-dashboard-accounts',
    templateUrl: './dashboard-view.component.html',
    styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit, OnDestroy {
    accounts: Array<Account> = [];

    uiState: UiState = new UiState(true);

    constructor(
        private accountsService: AccountsService
    ) {}

    ngOnInit() {
        this.accountsService.getAll().subscribe(this.onAccountsLoad.bind(this), this.onAccountsLoadFailure.bind(this));
    }

    onAccountsLoad(accounts: Account[]){
        this.accounts = accounts;

        this.uiState.onComplete();
    }

    onAccountsLoadFailure(error: any) {
        this.uiState.onError(error);
    }

    ngOnDestroy() {

    }
}
