import { Component, OnInit, OnDestroy, Input, HostBinding, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { LeadsService } from '../leads.service';

import { Lead, LeadStatus, LeadChangedEvent } from '../';
import { TimelineItem, TimelineService } from '../view/timeline';

@Component({
    selector: 'leads-status-selector',
    template: `<div class="btn-group" dropdown>
        <button dropdownToggle type="button" class="btn btn-primary dropdown-toggle" [style.background]="lead?.status?.style?.bgColor" [style.border-color]="lead?.status?.style?.bgColor" [style.color]="lead?.status?.style?.color" role="button" tooltip="Lead stage">
            {{ lead?.status?.text || 'Status' }} <span class="caret"></span>
        </button>
            
        <ul *dropdownMenu class="dropdown-menu rounded-0 border-0" role="menu">
            <li role="menuitem" *ngFor="let status of statuses" class="text-nowrap"><button class="dropdown-item text-nowrap"
            (click)="select(status)" role="button">{{ status.text }} <fa name="check" *ngIf="lead?.status?._id == status._id"></fa></button></li>
        </ul>
    </div>`
})
export class StatusSelectorComponent implements OnInit, OnDestroy {
    @Input() lead: Lead;
    @Input() statuses: Array<LeadStatus>;

    private onLeadLoadListener: Subscription;

    constructor(
        private leadsService: LeadsService,
        private timelineService: TimelineService
    ) {}

    ngOnInit() {
        this.onLeadLoadListener = this.leadsService.onLeadLoad.subscribe(this.leadOnLoad.bind(this));
    }

    leadOnLoad(lead: Lead) {
        this.lead = lead;

        this.leadsService.addLeadChangedEventListener(this.lead, this.leadOnStatusChange.bind(this));
    }

    public select(status: LeadStatus) {
        if(this.lead.status == null || this.lead.status.name != status.name) {            
            this.leadsService.setStatus(this.lead, status);
        }
    }

    leadOnStatusChange(event: LeadChangedEvent) {
        if(event.newLead && event.newLead.status) {
            this.lead.status = event.newLead.status;
        }
    }

    ngOnDestroy() {
        this.onLeadLoadListener.unsubscribe();
    }
}