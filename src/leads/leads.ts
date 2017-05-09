import { LeadsService } from 'leads/leads.service';
import { TimelineItem } from 'leads/view/timeline/timeline';

export class Company {
    slug: string;
    name: string;
}

export class Lead {
    slug: string;
    company: Company;
    name: string;
    status: LeadStatus;
    timeline: Array<TimelineItem>;
}

export class LeadStatus {
    name: string;
    text: string;
    style: {
        bgColor: string;
        color: string;
    }
}

export class LeadChangedEvent {
    constructor(
        public company: string,
        public lead: string,
        public newStatus: LeadStatus = null
    ) {}
}

export { LeadsService }