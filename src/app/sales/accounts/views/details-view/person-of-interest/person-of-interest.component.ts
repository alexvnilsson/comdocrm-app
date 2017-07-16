import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Account, AccountPersonOfInterest } from '../../../models/accounts';
import { AccountsService } from '../../../services/accounts.service';

@Component({
    selector: 'ccrm-sales-accounts-person-of-interest',
    template: `<ng-container *ngIf="person">
        <div class="card card-block pt-1 pb-1">
            <div class="row flex-row person-card pt-1 pb-1">
                <div class="col-10">
                    <ccrm-ui-inline-editor placeholder="För- och efternamn" (onModelUpdated)="onModelUpdated($event)" [(ngModel)]="person.fullName" name="fullName">
                        <span class="lead">{{ person.fullName }}</span>
                        <span *ngIf="!person.fullName" class="lead text-muted">För- och efternamn</span>
                    </ccrm-ui-inline-editor>
                </div>

                <div class="col-2 justify-content-end">
                    <a 
                        class="no-underline color-black ml-2"
                        (click)="onRemovePersonOfInterest()"
                        role="button">
                        &times;
                    </a>
                </div>
            </div>

            <div class="row person-card pt-1 pb-1">
                <div class="col text-nowrap mr-1">
                    <span class="text-muted d-block">E-postadress</span>
                    <ccrm-ui-inline-editor placeholder="E-postadress" (onModelUpdated)="onModelUpdated($event)" [(ngModel)]="person.emailAddress" name="contact_emailAddress">
                        <a [href]="'mailto:' + person.emailAddress" rel="noopener">{{ person.emailAddress }}</a>
                        <span *ngIf="!person.emailAddress" class="small text-muted">E-postadress</span>
                    </ccrm-ui-inline-editor>
                </div>

                <div class="col text-nowrap mr-1">
                    <span class="text-muted d-block">Telefonnummer</span>
                    <ccrm-ui-inline-editor placeholder="Telefonnummer" (onModelUpdated)="onModelUpdated($event)" [(ngModel)]="person.phoneNumber" name="contact_phoneNumber">
                        {{ person.phoneNumber }}
                        <span *ngIf="!person.phoneNumber" class="small text-muted">Telefonnummer</span>
                    </ccrm-ui-inline-editor>
                </div>
            </div>
        </div>
    </ng-container>`
})
export class PersonOfInterestComponent implements OnInit {
    @Input('account') account: Account;
    @Input('person') person: AccountPersonOfInterest;

    @Output() onPersonDeleted: EventEmitter<AccountPersonOfInterest> = new EventEmitter();

    constructor(private accountsService: AccountsService) {}

    ngOnInit() {

    }

    onRemovePersonOfInterest() {
        this.accountsService.deletePersonOfInterest(this.account, this.person).subscribe(res => {
            this.onPersonDeleted.next(this.person);
        });
    }

    onModelUpdated(event: Event) {
        this.accountsService.updatePersonOfInterest(this.account, this.person).subscribe(result => {
        });
    }
}
