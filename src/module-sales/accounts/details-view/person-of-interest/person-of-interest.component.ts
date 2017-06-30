import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Account, AccountPersonOfInterest } from '../../../models/account';
import { AccountsService } from '../../accounts.service';

@Component({
    selector: 'ccrm-sales-accounts-person-of-interest',
    template: `<ng-container *ngIf="person">
        <div class="row flex-row person-card pt-1 pb-1">
            <div class="col-10">
                <ccrm-ui-inline-editor placeholder="First and last name" (onModelUpdated)="onModelUpdated($event)" [(ngModel)]="person.fullName" name="fullName">
                    <span class="lead">{{ person.fullName }}</span>
                    <span *ngIf="!person.fullName" class="lead text-muted">First and last name</span>
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
                <span class="text-muted d-block">Email</span>
                <ccrm-ui-inline-editor placeholder="Email" (onModelUpdated)="onModelUpdated($event)" [(ngModel)]="person.emailAddress" name="contact_emailAddress">
                    {{ person.emailAddress }}
                    <span *ngIf="!person.emailAddress" class="small text-muted">Email address</span>
                </ccrm-ui-inline-editor>
            </div>

            <div class="col text-nowrap mr-1">
                <span class="text-muted d-block">Phone</span>
                <ccrm-ui-inline-editor placeholder="Phone number" (onModelUpdated)="onModelUpdated($event)" [(ngModel)]="person.phoneNumber" name="contact_phoneNumber">
                    {{ person.phoneNumber }}
                    <span *ngIf="!person.phoneNumber" class="small text-muted">Phone number</span>
                </ccrm-ui-inline-editor>
            </div>
        </div>
    </ng-container>`
})
export class PersonOfInterestComponent implements OnInit {
    @Input('person') person: AccountPersonOfInterest;

    @Output() onPersonDeleted: EventEmitter<AccountPersonOfInterest> = new EventEmitter();

    constructor(private accountsService: AccountsService) {}

    ngOnInit() {

    }

    onRemovePersonOfInterest() {
        this.accountsService.deletePersonOfInterest(this.person).subscribe(result => {
            if(result.updated) {
                this.onPersonDeleted.next(this.person);
            }
        });
    }

    onModelUpdated(event: Event) {
        this.accountsService.updatePersonOfInterest(this.person).subscribe(result => {
        });
    }
}
