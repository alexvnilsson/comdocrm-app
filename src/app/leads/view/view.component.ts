import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ModalDirective } from 'ngx-bootstrap';

import { RouteTransitionAnimation } from 'app/route-transition.animation';

import { LeadsService } from 'app/leads/leads.service';
import { Lead, Company, LeadStatus } from 'app/leads/lead';
import LeadStatusPendingChange from 'app/leads/status/leadStatusPendingChange';

import { TimelineAddMessageComponent } from './timeline-add-message.component';

@Component({
    selector: 'leads-view',
    templateUrl: './view.component.html',
    styles: [
        ``
    ],
    animations: [
        RouteTransitionAnimation
    ],
    host: {
        '[@routeTransition]': 'true'
    }
})
export class ViewComponent implements OnInit {
    @ViewChild('addMessage')
    addMessage: TimelineAddMessageComponent;

    @Input() lead: Lead;
    @Input() leadStatuses: Array<LeadStatus>;

    @Input() statusPending: LeadStatusPendingChange;

    constructor(private route: ActivatedRoute, private leadsService: LeadsService) {}

    ngOnInit() {
        let companySlug = this.route.snapshot.params['company'],
            leadSlug = this.route.snapshot.params['lead'];

        if(companySlug != null && leadSlug != null) {
            this.leadsService.getLead(companySlug, leadSlug, null, (lead: Lead) => {
                this.lead = lead;
            })
            .getLeadStatusTable((leadStatuses: Array<LeadStatus>) => {
                this.leadStatuses = leadStatuses;
            });
        }
    }

    public onLeadStatusChanged(status: LeadStatus) {
        
    }

    openAddMessage() {
        this.addMessage.open();
    }
}