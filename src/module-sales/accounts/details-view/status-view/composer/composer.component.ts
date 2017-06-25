import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Account } from '../../../../models/account';

@Component({
    selector: 'ccrm-sales-accounts-status-composer',
    template: `
        <ng-container *ngIf="composer == 'log'">
            <ccrm-sales-accounts-status-composer-log></ccrm-sales-accounts-status-composer-log>
        </ng-container>
    `
})
export class ComposerComponent {
    @Input() composer: string;
}
