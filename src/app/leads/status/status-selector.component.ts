import { Component, OnInit, OnDestroy, Input, HostBinding, Output, EventEmitter } from '@angular/core';

import { LeadsService } from 'app/leads/leads.service';

import { Subscription } from 'rxjs/Subscription';

import { StatusFormComponent } from './status-form.component';

import Lead from 'app/leads/lead';
import LeadStatus from 'app/leads/status/leadStatus';
import LeadStatusPendingChange from 'app/leads/status/leadStatusPendingChange';

@Component({
    selector: 'leads-status-selector',
    template: `<div class="btn-group" dropdown>
        <button [disabled]="leadStatusPendingChange.waiting" dropdownToggle type="button" class="btn btn-primary dropdown-toggle" [style.background]="lead?.status?.style?.bgColor" [style.border-color]="lead?.status?.style?.bgColor" [style.color]="lead?.status?.style?.color" role="button" tooltip="Lead stage">
            {{ lead?.status?.text || 'Status' }} <span class="caret"></span>
        </button>
            
        <ul *dropdownMenu class="dropdown-menu" role="menu">
            <li role="menuitem" *ngFor="let status of statuses" class="text-nowrap"><button class="dropdown-item text-nowrap"
                (click)="select(status)" role="button">{{ status.text }} <fa class="ml-2" name="check" *ngIf="status._id == lead?.status?._id"></fa></button></li>
            <li class="divider dropdown-divider"></li>
            <li role="menuitem"><a class="dropdown-item" href="#">Account/sold</a></li>
        </ul>
    </div>`
})
export class StatusSelectorComponent implements OnInit, OnDestroy {
    @Input() statusForm: StatusFormComponent;
    @Input() lead: Lead;
    @Input() statuses: Array<LeadStatus>;

    @Input() leadStatusPendingChange = new LeadStatusPendingChange(false);
    @HostBinding('class.d-none') isHidden: boolean = false;

    @Output() statusChanged = new EventEmitter();
    @Output() beforeStatusChange = new EventEmitter();

    private beforeStatusChangeSubscription = new Subscription();

    constructor(private leadsService: LeadsService) {}

    ngOnInit() {
        this.beforeStatusChangeSubscription = this.beforeStatusChange.subscribe(() => {
            if(this.leadStatusPendingChange.waiting && this.leadStatusPendingChange.newStatus != null) {
                this.lead.status = this.leadStatusPendingChange.newStatus;
                this.statusForm.onStatusPendingChange(this.leadStatusPendingChange);
            }

            this.isHidden = this.leadStatusPendingChange.waiting;
        });
    }

    public select(status: LeadStatus) {
        if(this.lead.status == null || this.lead.status._id != status._id) {
            this.leadStatusPendingChange = new LeadStatusPendingChange(true, status, this.lead.status);
            this.beforeStatusChange.emit(status);
            
            // this.leadsService.setStatus(this.lead, status, (status: LeadStatus) => {
            //     this.statusChanged.emit(status);
            // });

            
        }
    }

    ngOnDestroy() {
        this.beforeStatusChangeSubscription.unsubscribe();
    }
}