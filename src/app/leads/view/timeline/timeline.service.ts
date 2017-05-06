import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { HttpClientService } from 'app/http-client.service';

import { TimelineItem, TimelineEvent } from './timeline';

@Injectable()
export class TimelineService {
    public timelineChanged: EventEmitter<TimelineEvent> = new EventEmitter();

    constructor(private httpClient: HttpClientService, private http: Http) {}

    public publishItem(item: TimelineItem) {
        this.timelineChanged.emit(new TimelineEvent(item));
    }

    public addItem(items: Array<TimelineItem>, newItem: TimelineItem) {
        let _items: Array<TimelineItem> = items;
        _items.push(newItem);
        return this.sortByDate(_items);
    }

    private sortByDate(items: Array<TimelineItem>): Array<TimelineItem> {
        return items.sort((a: TimelineItem, b: TimelineItem) => {
            if (a.date < b.date) return 1;
            else if (a.date > b.date) return -1;
            else return 0;
        })
    }
}