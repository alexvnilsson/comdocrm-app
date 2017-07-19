import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { Router } from '@angular/router';

import { AccountsService } from '../../../services/accounts.service';

import { Account } from '../../../models/accounts';

@Component({
    selector: 'ccrm-sales-accounts-list-view-item',
    templateUrl: './list-item.component.html',
    styleUrls: [ './list-item.component.scss' ],
    animations: [
        trigger('itemTransition', [
            transition('void => *', [
                animate('0.2s 300ms', keyframes([
                    style({ opacity: '0', transform: 'translateX(-50%)', offset: 0 }),
                    style({ opacity: '1', transform: 'translateX(0%)', position: 'static', offset: 1 })
                ]))
            ]),
            transition('* => void', [
                animate('0.2s', keyframes([
                    style({ opacity: '1', position: 'fixed', offset: 0 }),
                    style({ opacity: '0', offset: 1 })
                ]))
            ])
        ])
    ],
    host: {
        
    }
})
export class ListItemComponent implements OnInit, OnDestroy {
    @Input() account: Account;

    constructor(
        private router: Router,
        private accountsService: AccountsService
    ) {

    }

    clickAccount() {
        if(this.account)
            this.accountsService.navigateTo(this.account);

        return false;
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}