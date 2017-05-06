import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, HostBinding, ViewChild, ElementRef } from '@angular/core';

import { TimelineItem } from './timeline';

@Component({
    selector: 'leads-timeline-item',
    template: `
        <p>{{ item.text }}</p>

        <p class="mb-0"><small>@ {{ item.date | date: 'yyyy-MM-dd' }} by <i>Account manager</i></small></p>
    `,
    host: {
        '[class.card]': 'true',
        '[class.card-block]': 'true',
        '[class.rounded-0]': 'true',
        '[class.border-0]': 'true',
        '[class.bg-faded]': 'true'
    }
})
export class TimelineItemComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() public item: TimelineItem;

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    ngOnDestroy() {

    }
}