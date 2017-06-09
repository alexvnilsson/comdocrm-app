export class Account {
    id: string;
    slug: string;
    source: {
      id: string;
      slug: string;
      displayName: string;
    }
    displayName: string;
    contact: AccountContact;
    business: AccountBusiness;
    peopleOfInterest: AccountPersonOfInterest[];
    datesOfInterest: AccountDateOfInterest[];
    statuses: AccountStatus[];
}

export class AccountSource {
    id: string;
    slug: string;
    displayName: string;
}

export class AccountContact {
  emailAddress: string;
  phoneNumber: string;
}

export class AccountBusiness {
  displayName: string;
  registrationNumber: string;
}

export class AccountPersonOfInterest {
  fullName: string;
  jobTitle: string;
  contact: AccountContact;
  decisionMaker: boolean;
}

export class AccountDateOfInterest {
  displayName: string;
  dateTime: string;
}

export class AccountStatus {
  publicationDate: Date;
  headerText?: string;
  messageText: string;
  footerText?: string;
  metadata?: AccountStatusMetadata;
}

export class AccountStatusMetadata {
  sourceUrl: string;
}

export class AccountAddress {
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}