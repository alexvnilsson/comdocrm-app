import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ModalDirective } from 'ngx-bootstrap';

import { RouteTransitionAnimation } from 'app/route-transition.animation';
import { Subscription } from 'rxjs/Subscription';

import { TimelineItemComponent } from 'app/leads/view/timeline/timeline-item.component';
import { TimelineService, TimelineItem } from 'app/leads/view/timeline/timeline';
import { Lead, Company, LeadStatus, LeadChangedEvent, LeadsService } from 'app/leads/lead';

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

    constructor(private route: ActivatedRoute, private leadsService: LeadsService, private timelineService: TimelineService) {}

    ngOnInit() {
        let companySlug = this.route.snapshot.params['company'],
            leadSlug = this.route.snapshot.params['lead'];

        if(companySlug != null && leadSlug != null) {
            this.onLeadLoadListener = this.leadsService.onLeadLoad.subscribe(this.leadOnLoad.bind(this));

            this.leadsService
            .getLead(companySlug, leadSlug, null)
            .getLeadStatusTable(this.leadStatusTableLoaded.bind(this));
        }
    }

    leadOnLoad(lead: Lead) {
        this.lead = lead;

        this.leadsService.addLeadChangedEventListener(lead, this.leadOnChange.bind(this));
    }

    leadStatusTableLoaded(statuses: Array<LeadStatus>) {
        this.leadStatuses = statuses;
    }

    leadOnChange(event: LeadChangedEvent) {
        if(event.newStatus) return this.leadOnStatusChange(event.newStatus);
    }

    leadOnStatusChange(status: LeadStatus) {
        this.timelineService.onItemAdded(new TimelineItem(new Date(), TimelineItem.Classifications.LeadStatusChanged, true, null, false));
    }

    ngOnDestroy() {
        this.onLeadLoadListener.unsubscribe();
    }
}