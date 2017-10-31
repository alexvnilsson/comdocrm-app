import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Account, AccountPersonOfInterest } from '../../../models/accounts';
import { AccountsService } from '../../../services/accounts.service';

@Component({
    selector: 'ccrm-sales-accounts-person-of-interest',
    templateUrl: './person-of-interest.component.html',
    styleUrls: [ './person-of-interest.component.scss' ]
})
export class PersonOfInterestComponent implements OnInit {
    @Input('account') account: Account;
    @Input('person') person: AccountPersonOfInterest;

    @Output() onPersonDeleted: EventEmitter<{ account: Account, person: AccountPersonOfInterest }> = new EventEmitter();

    ngOnInit() {

    }

    onModelUpdated(any) {
      console.log(any);
    }

    onRemovePersonOfInterest() {
        this.onPersonDeleted.emit({
            account: this.account,
            person: this.person
        });
    }
}
