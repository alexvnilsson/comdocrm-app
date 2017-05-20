import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, HostBinding, ViewChild, ElementRef } from '@angular/core';

import { TimelineItem } from './';

@Component({
    selector: 'leads-timeline-item',
    template: `
        <div *ngIf="item.editing; else notEditing">
            <div class="input-group">
                <textarea type="text" class="form-control d-block" rows="2" placeholder="Would you like to describe the details of the lead's state change? It is not required."></textarea>
            </div>
        </div>
        <ng-template #notEditing>
            <p>{{ item.text }}</p>
        </ng-template>

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