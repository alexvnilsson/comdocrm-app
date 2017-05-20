import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { LeadsService } from '../../leads.service';
import { TimelineItem, TimelineEvent } from './';

import { Settings } from 'app/constants';

@Injectable()
export class TimelineService {
    private items: Array<TimelineItem> = null;

    public onTimelineChanged: EventEmitter<Array<TimelineItem>> = new EventEmitter();

    constructor(private http: Http) {}

    public onItemsLoaded(items: Array<TimelineItem>) {
        this.items = items;
    }

    public onItemAdded(item: TimelineItem) {
        if(this.items !== null)
            this.publishItem(this.items, item);
    }

    public publishItem(items: Array<TimelineItem>, item: TimelineItem) {
        this.onTimelineChanged.emit(this.addItem(items, item));
    }

    private addItem(items: Array<TimelineItem>, newItem: TimelineItem) {
        let _items: Array<TimelineItem> = [];
        _items.push(newItem);
        
        items.forEach((item: TimelineItem) => {
            _items.push(item);
        });

        this.items = _items;

        return this.items;
    }

    private sortByDate(items: Array<TimelineItem>): Array<TimelineItem> {
        return items.sort((a: TimelineItem, b: TimelineItem) => {
            if (a.date < b.date) return 1;
            else if (a.date > b.date) return -1;
            else return 0;
        })
    }
}