import { Component, OnInit, OnDestroy, Input, HostBinding, Output, EventEmitter } from '@angular/core';

import { LeadsService } from 'app/leads/leads.service';

import { Subscription } from 'rxjs/Subscription';

import { Lead, LeadStatus } from 'app/leads/lead';
import LeadStatusPendingChange from 'app/leads/status/leadStatusPendingChange';

import { TimelineItem, TimelineService } from 'app/leads/view/timeline/timeline';

@Component({
    selector: 'leads-status-selector',
    template: `<div class="btn-group" dropdown>
        <button dropdownToggle type="button" class="btn btn-primary dropdown-toggle" [style.background]="lead?.status?.style?.bgColor" [style.border-color]="lead?.status?.style?.bgColor" [style.color]="lead?.status?.style?.color" role="button" tooltip="Lead stage">
            {{ lead?.status?.text || 'Status' }} <span class="caret"></span>
        </button>
            
        <ul *dropdownMenu class="dropdown-menu rounded-0 border-0" role="menu">
            <li role="menuitem" *ngFor="let status of statuses" class="text-nowrap"><button class="dropdown-item text-nowrap"
                (click)="select(status)" role="button">{{ status.text }} <fa class="ml-2" name="check" *ngIf="status.name == lead?.status?.name"></fa></button></li>
            <li class="divider dropdown-divider"></li>
            <li role="menuitem"><a class="dropdown-item" href="#">Account/sold</a></li>
        </ul>
    </div>`
})
export class StatusSelectorComponent implements OnInit, OnDestroy {
    @Input() lead: Lead;
    @Input() statuses: Array<LeadStatus>;

    @Output() statusChanged = new EventEmitter();

    constructor(
        private leadsService: LeadsService,
        private timelineService: TimelineService
    ) {}

    ngOnInit() {

    }

    public select(status: LeadStatus) {
        if(this.lead.status == null || this.lead.status._id != status._id) {            
            this.leadsService.setStatus(this.lead, status, (status: LeadStatus) => {
                this.statusChanged.emit(status);

                this.timelineService.publishItem(new TimelineItem(
                    new Date(),
                    TimelineItem.Classifications.LeadStatusChanged,
                    true,
                    null,
                    false
                ));
            });


        }
    }

    ngOnDestroy() {
        
    }
}