import { Component, Input, OnInit } from '@angular/core';

import { Account, AccountStatus } from '../../../models/accounts';


@Component({
    selector: 'ccrm-sales-accounts-list-view-all-statuses',
    template: `<ng-container *ngIf="accounts && accounts.length > 0">
        <ccrm-sales-accounts-status-item
            *ngFor="let account of accounts"
            [account]="account"
            [status]="account.statuses[0]"
            [light]="true">
        </ccrm-sales-accounts-status-item>
    </ng-container>`
})
export class AllStatusesComponent implements OnInit {
    private apiBaseAddr = '/api/sales/accounts/statuses';

    accounts: Array<Account> = [];

    constructor(
        
    ) {}

    ngOnInit() {
        this.getAllTop();
    }

    private getAllTop() {
      
    }
}