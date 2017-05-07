import { TimelineService } from './timeline.service';

import { TimelineComponent } from './timeline.component';

class TimelineItem {
    public static Classifications = {
        LeadStatusChanged: 'LEAD_STATUS_CHANGED'
    };

    _id: number;

    constructor(
        public date: Date,
        public classification: string,
        public editing: boolean,
        public text?: string,
        public published?: boolean
    ) {}
}

class TimelineEvent {
    constructor(
        public newItem?: TimelineItem
    ) {}
}

export {
    TimelineService,
    TimelineItem,
    TimelineEvent
}
