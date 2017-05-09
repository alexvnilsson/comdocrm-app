import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';
import { TimelineService, TimelineItem, TimelineEvent } from 'leads/view/timeline/timeline';
import { Lead, LeadsService } from 'leads/leads';

@Component({
    selector: 'leads-timeline',
    template: `
        <leads-timeline-item [@stateTransition]="item" class="mb-2" *ngFor="let item of items" [item]="item"></leads-timeline-item>
    `,
    animations: [
        trigger('stateTransition', [
            transition('void => *', [
                animate(200, keyframes([
                    style({opacity: 0, offset: 0}),
                    style({opacity: 1, offset: 1.0})
                ]))
            ]),
            transition('* => void', [
                animate(200, keyframes([
                    style({opacity: 1, offset: 0}),
                    style({opacity: 0, offset: 1.0})
                ]))
            ]),
        ])
    ]
})
export class TimelineComponent implements OnInit, OnDestroy {
    @Input() items: Array<TimelineItem>;

    private onLeadLoadListener: Subscription;
    private timelineChangeListener: Subscription;

    constructor(private timelineService: TimelineService, private leadsService: LeadsService) {
        this.onLeadLoadListener = this.leadsService.onLeadLoad.subscribe(this.leadOnLoad.bind(this));
    }

    ngOnInit() {
        this.timelineChangeListener = this.timelineService.onTimelineChanged.subscribe(this.onTimelineChanged.bind(this));
    }

    leadOnLoad(lead: Lead) {
        this.items = lead.timeline;

        this.timelineService.onItemsLoaded(this.items);
    }

    onTimelineItemAdded(item: TimelineItem) {
        this.timelineService.publishItem(this.items, item);
    }

    onTimelineChanged(items: Array<TimelineItem>) {
        if(items != null && items.length > 0) {
            this.items = items;
        }
    }

    ngOnDestroy() {
        this.onLeadLoadListener.unsubscribe();
        this.timelineChangeListener.unsubscribe();
    }
}