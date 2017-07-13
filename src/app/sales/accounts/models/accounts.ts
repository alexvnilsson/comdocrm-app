import { EventEmitter } from '@angular/core';
import { UserTask } from 'app/user-tasks';
import { User } from 'app/common/users/user';

export enum AccountStates {
    None,
    Draft,
    Published,
    Remove,
    ImportedNotAdded
}

export class Account {
    id: string;
    alias: string;
    state?: AccountStates;
    source: {
        id: string;
        slug: string;
        displayName: string;
    }
    customer?: AccountCustomer;
    manager?: AccountManager;
    contact: AccountContact;
    business: AccountBusiness;
    peopleOfInterest: AccountPersonOfInterest[];
    datesOfInterest: AccountDateOfInterest[];

    statuses: AccountStatus[];
    userTasks: Array<UserTask> = [];

    isManager?: boolean;
}

export class AccountCustomer {
    legalName?: string;
}

export class AccountManager {
    id: string;
    active: boolean;
    assigned: Date;
    user: User;

    pendingApproval?: boolean;
}

export class AccountSource {
    id: string;
    slug: string;
    displayName: string;
}

export class AccountContact {
    id?: string;
    emailAddress: string;
    phoneNumber: string;
}

export class AccountBusiness {
    displayName: string;
    registrationNumber: string;
}

export class AccountPersonOfInterest {
    id: string;
    fullName: string;
    jobTitle: string;
    emailAddress?: string;
    phoneNumber?: string;
    decisionMaker: boolean;
}

export class AccountDateOfInterest {
    displayName: string;
    dateTime: string;
}

export class AccountStatus {
    accountId?: string;
    id?: string;
    publishedBy?: User;
    isDelayed?: boolean;
    publicationDate: Date;
    delayDate?: Date;
    isRemoved?: boolean;
    messageHeader: string;
    messageBody: string;
    messageFooter: string;
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