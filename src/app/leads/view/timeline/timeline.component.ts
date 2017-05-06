import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import { TimelineService } from 'app/leads/view/timeline/timeline.service';

import { Subscription } from 'rxjs/Subscription';
import { TimelineItem, TimelineEvent } from 'app/leads/view/timeline/timeline';

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

    private timelineChangeListener: Subscription;

    constructor(private timelineService: TimelineService) {
        this.timelineChangeListener = this.timelineService.timelineChanged.subscribe((event: TimelineEvent) => this.onTimelineChanged(event));
    }

    ngOnInit() {
        
    }

    onTimelineChanged(event: TimelineEvent) {
        if(this.items && this.items instanceof Array && event.newItem) {
            this.timelineService.addItem(this.items, event.newItem);
        }
    }

    ngOnDestroy() {
        this.timelineChangeListener.unsubscribe();
    }
}