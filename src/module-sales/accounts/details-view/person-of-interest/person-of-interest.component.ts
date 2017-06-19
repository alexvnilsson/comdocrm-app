import { Component, Input, OnInit } from '@angular/core';
import { Account, AccountPersonOfInterest } from '../../../models/account';
import { AccountsService } from '../../accounts.service';

@Component({
    selector: 'ccrm-sales-accounts-person-of-interest',
    template: `<ng-container *ngIf="person">
        <div class="row person-card pt-1 pb-1">
            <div class="col text-nowrap mr-1">
                <ccrm-ui-inline-editor placeholder="First and last name" (onModelUpdated)="onModelUpdated($event)" [(ngModel)]="person.fullName" name="fullName">
                    <span class="lead">{{ person.fullName }}</span>
                </ccrm-ui-inline-editor>
            </div>
        </div>

        <div class="row person-card pt-1 pb-1">
            <div class="col text-nowrap mr-1">
                <span class="text-muted d-block">Email</span>
                <ccrm-ui-inline-editor placeholder="Email" (onModelUpdated)="onModelUpdated($event)" [(ngModel)]="person.contact.emailAddress" name="contact_emailAddress">
                    {{ person.contact.emailAddress }}
                </ccrm-ui-inline-editor>
            </div>

            <div class="col text-nowrap mr-1">
                <span class="text-muted d-block">Phone</span>
                <ccrm-ui-inline-editor placeholder="Phone number" (onModelUpdated)="onModelUpdated($event)" [(ngModel)]="person.contact.phoneNumber" name="contact_phoneNumber">
                    {{ person.contact.phoneNumber }}
                </ccrm-ui-inline-editor>
            </div>
        </div>
    </ng-container>`
})
export class PersonOfInterestComponent implements OnInit {
    @Input('person') person: AccountPersonOfInterest;

    constructor(private accountsService: AccountsService) {}

    ngOnInit() {

    }

    onModelUpdated(event: Event) {
        this.accountsService.updatePersonOfInterest(this.person).subscribe(result => {
        });
    }
}
