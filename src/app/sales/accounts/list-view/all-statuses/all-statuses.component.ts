import { Component, Input, OnInit } from '@angular/core';
import { AccountStatus } from '../../accounts';
import { AuthHttpExtended } from '../../../../common/authentication/auth-http-extended';

@Component({
    selector: 'ccrm-sales-accounts-list-view-all-statuses',
    template: `<ccrm-sales-accounts-status-item
        *ngFor="let account of accounts"
        [account]="account"
        [status]="account.statuses[0]"
        [light]="true">
    </ccrm-sales-accounts-status-item>`
})
export class AllStatusesComponent implements OnInit {
    private apiBaseAddr: string = '/api/sales/accounts/statuses';
    
    accounts: Array<Account> = [];

    constructor(
        private http: AuthHttpExtended
    ) {}

    ngOnInit() {
        this.getAllTop();
    }

    private getAllTop() {
        this.http.get(`${this.apiBaseAddr}/all/top`)
        .map(response => response.json() as Array<Account> || null)
        .subscribe(accounts => this.accounts = accounts);
    }
}