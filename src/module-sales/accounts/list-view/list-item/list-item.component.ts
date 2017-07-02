import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { Router } from '@angular/router';
import { Account } from '../../../models/account';

@Component({
    selector: 'ccrm-sales-accounts-list-view-item',
    templateUrl: './list-item.component.html',
    styleUrls: [ './list-item.component.scss' ],
    animations: [
        trigger('itemTransition', [
            state('void', style({ position: 'fixed', opacity: '0' })),
            transition(':enter', [
                animate('0.2s 300ms', keyframes([
                    style({ opacity: '0', transform: 'translateX(-50%)', offset: 0 }),
                    style({ opacity: '1', transform: 'translateX(0%)', position: 'static', offset: 1 })
                ]))
            ]),
            transition(':leave', [
                animate('0.2s', keyframes([
                    style({ opacity: '1', position: 'fixed', offset: 0 }),
                    style({ opacity: '0', offset: 1 })
                ]))
            ])
        ])
    ],
    host: {
        '[@itemTransition]': 'true'
    }
})
export class ListItemComponent implements OnInit, OnDestroy {
    @Input() account: Account;

    constructor(
        private router: Router
    ) {

    }

    clickAccount() {
        if(this.account)
            this.router.navigate(['/sales/accounts/view', this.account.nameIdentity]);

        return false;
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}