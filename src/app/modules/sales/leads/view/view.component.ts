import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ModalDirective } from 'ngx-bootstrap';

import { RouteTransitionAnimation } from 'app/ui/animations';
import { Subscription } from 'rxjs/Subscription';

import { LeadsService } from '../leads.service';
import { TimelineService } from './timeline/timeline.service';

import { TimelineItem } from './timeline';
import { Lead, Company, LeadStatus, LeadChangedEvent } from '../';


import { TimelineComponent } from './timeline/timeline.component';
import { TimelineItemComponent } from './timeline/timeline-item.component';

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
        '[@routeTransition]': ''
    }
})
export class ViewComponent implements OnInit, OnDestroy {
    @Input() lead: Lead;
    @Input() leadStatuses: Array<LeadStatus>;

    private onLeadLoadListener: Subscription;
    private onLeadStatusTableLoadListener: Subscription;

    constructor(private route: ActivatedRoute, private leadsService: LeadsService, private timelineService: TimelineService) {}

    ngOnInit() {
        let leadId = this.route.snapshot.params['id'];

        if(leadId != null) {
            this.onLeadLoadListener = this.leadsService.onLeadLoad.subscribe(this.leadOnLoad.bind(this));

            this.leadsService
            .getLead(leadId, null)
            .getAllLeadStatuses(this.allLeadStatusesLoaded.bind(this));
        }
    }

    leadOnLoad(lead: Lead) {
        this.lead = lead;

        this.onLeadStatusTableLoadListener = this.leadsService.addLeadChangedEventListener(lead, this.leadOnChange.bind(this));
    }

    allLeadStatusesLoaded(statuses: Array<LeadStatus>) {
        this.leadStatuses = statuses;
    }

    leadOnChange(event: LeadChangedEvent) {
        if(event.newLead) return this.leadOnStatusChange(event.newLead);
    }

    leadOnStatusChange(lead: Lead) {
        this.timelineService.onItemAdded(new TimelineItem(new Date(), TimelineItem.Classifications.LeadStatusChanged, true, null, false));
    }

    ngOnDestroy() {
        this.onLeadLoadListener.unsubscribe();
        this.onLeadStatusTableLoadListener.unsubscribe();
    }
}