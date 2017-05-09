import { Component, Input, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { ConversationItem } from './conversation';

@Component({
    selector: 'leads-conversation-item',
    template: `
        <div *ngIf="item.editing; else notEditing">
            <div class="input-group">
                <textarea type="text" class="form-control d-block" rows="2" placeholder="Would you like to describe the details of the lead's state change? It is not required."></textarea>
            </div>
        </div>
        <ng-template #notEditing>
            <p>{{ item.text }}</p>
        </ng-template>

        <p class="mb-0"><small>@ {{ item.date | date: 'yyyy-MM-dd' }} by <i>Account manager</i></small></p>
    `
})
export class ConversationItemComponent implements OnDestroy {
    @Input() item: ConversationItem;

    constructor() {}

    ngOnDestroy() {
        
    }
}