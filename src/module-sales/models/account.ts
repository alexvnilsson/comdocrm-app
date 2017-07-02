﻿import { EventEmitter } from '@angular/core';
import { UserTask } from 'module-user-tasks';
import { User } from '../../common/users/user';

export class Account {
    id: string;
    nameIdentity: string;
    source: {
        id: string;
        slug: string;
        displayName: string;
    }
    displayName: string;
    manager?: User;
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
    userId?: string;
    userName?: string;
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