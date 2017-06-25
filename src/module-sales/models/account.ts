import { UserTask } from 'module-user-tasks';
import { EventEmitter } from '@angular/core';
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
    userTasks: Array<UserTask> = [];
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
    accountId?: string;

    id: string;
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
    accountId?: string;
    id?: string;
    userId?: string;
    userName?: string;
    isDelayed?: boolean;
    publicationDate: Date;
    delayDate?: Date;
    isRemoved?: boolean;
    message: {
        header: string;
        body: string;
        footer: string;
    };
    metadata?: AccountStatusMetadata;
    userTasks?: Array<UserTask> = [];
}

export class AccountStatusMetadata {
    publishedByUser: string;
    sourceUrl: string;
}

export class AccountAddress {
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}