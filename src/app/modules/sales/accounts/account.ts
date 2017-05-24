export class Account {
    id: string;
    slug: string;
    legalName: string;
    name: string;
    created: string;
    contact: AccountContact;
    status: AccountStatus;
}

export class AccountContact {
    emails: Array<AccountContactEmail>;
    phones: Array<AccountContactPhone>;
}

export class AccountContactEmail {
    displayName: string;
    value: string;
}

export class AccountContactPhone {
    displayName: string;
    value: string;
}

export class AccountStatus {
    name: string;
    displayName: string;
    appearance: AccountStatusAppearance;
}

export class AccountStatusAppearance {
    backgroundColor: string;
    foreColor: string;
}