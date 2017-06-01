export class Account {
    id: string;
    slug: string;
    source: {
      id: string;
      slug: string;
      displayName: string;
    }
    displayName: string;
    contact: Contact;
    business: Business;
    peopleOfInterest: PersonOfInterest[];
    datesOfInterest: DateOfInterest[];
    statuses: Status[];
}

export class Contact {
  emailAddress: string;
  phoneNumber: string;
}

export class Business {
  displayName: string;
  registrationNumber: string;
}

export class PersonOfInterest {
  fullName: string;
  jobTitle: string;
  contact: Contact;
  decisionMaker: boolean;
}

export class DateOfInterest {
  displayName: string;
  dateTime: string;
}

export class Status {
  publicationDate: Date;
  headerText: string;
  messageText: string;
  footerText: string;
  metadata: StatusMetadata;
}

export class StatusMetadata {
  sourceUrl: string;
}

export class Address {
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}