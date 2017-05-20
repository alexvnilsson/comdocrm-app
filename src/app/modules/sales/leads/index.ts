import { TimelineItem } from './view/timeline';

export class Company {
    _id: string;
    slug: string;
    name: string;
    contact: ILeadContact;
}

export class Lead {
    _id: string;
    slug: string;
    company: Company;
    contact: ILeadContact;
    name: string;
    status: LeadStatus;
    timeline: Array<TimelineItem>;
}

export interface ILeadContact {
  email: Array<ILeadContactEmail>;
  phone: Array<ILeadContactPhone>;
}

export interface ILeadContactEmail {
  name: string;
  address: string;
}

export interface ILeadContactPhone {
  name: string;
  number: string;
}

export class LeadStatus {
    _id: string;
    name: string;
    text: string;
    style: {
        bgColor: string;
        color: string;
    }
}

export interface ILeadChangedEvent {
  oldLead: Lead;
  newLead: Lead;
}
export class LeadChangedEvent implements ILeadChangedEvent {
    constructor(
        public oldLead: Lead,
        public newLead: Lead
    ) {}
}

//export { LeadsService } from './leads.service';
//export { LeadsComponent } from './leads.component';
export { LeadListItemDirective } from './lead-list-item.directive';
