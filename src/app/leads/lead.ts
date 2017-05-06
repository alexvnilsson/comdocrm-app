import { LeadsService } from 'app/leads/leads.service';
import { TimelineItem } from 'app/leads/view/timeline/timeline';

export class Company {
    _id: number;
    slug: string;
    name: string;
}

export class Lead {
    _id: number;
    slug: string;
    company: Company;
    name: string;
    status: LeadStatus;
    timeline: Array<TimelineItem>;
}

export class LeadStatus {
    _id: number;
    name: string;
    text: string;
}