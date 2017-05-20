import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LeadsService } from '../../leads.service';

import { Lead } from '../../';
import { ConversationItem } from './conversation';

import { ConversationItemComponent } from './conversation-item.component';

@Component({
    selector: 'leads-conversation',
    template: `
        <leads-conversation-item *ngFor="let item of items" [item]="item" 
    `
})
export class ConversationComponent implements OnDestroy {
    @Input() items: Array<ConversationItem>;

    private onLeadLoadListener: Subscription;

    constructor(private leadsService: LeadsService) {
        this.onLeadLoadListener = this.leadsService.onLeadLoad.subscribe(this.leadOnLoad.bind(this));
    }

    leadOnLoad(lead: Lead) {
        
    }

    ngOnDestroy() {
        this.onLeadLoadListener.unsubscribe();
    }
}