import { Component, OnInit, AfterViewInit, AfterContentInit, OnDestroy, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { AccountsService, AccountUpdateResult } from '../../../../services/accounts.service';
import { Account, AccountPersonOfInterest } from '../../../../models/accounts';
import { FormState } from 'app/common/ui/views/form-state';

@Component({
    selector: 'ccrm-accounts-add-person-of-interest',
    templateUrl: './add-person-of-interest.component.html'
})
export class AddPersonOfInterestComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
    @ViewChild('modal') modal: ModalDirective;
    @ViewChild('contactFullName') contactFullNameInput: ElementRef;

    @Output() onClosed: EventEmitter<any> = new EventEmitter();

    @Input() account: Account;
    person: AccountPersonOfInterest = {
        id: null,
        fullName: null,
        jobTitle: null,
        phoneNumber: null,
        emailAddress: null,
        decisionMaker: false,
    };

    public formState: FormState = new FormState({
        isLoading: true
    });

    constructor(
        private location: Location,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private accountsService: AccountsService
    ){
        
    }

    ngOnInit() {
        
    }

    ngAfterViewInit() {
        if(this.contactFullNameInput && this.contactFullNameInput.nativeElement)
            this.contactFullNameInput.nativeElement.focus();
    }

    ngAfterContentInit() {
        
    }

    savePerson() {
        this.accountsService.addPersonOfInterest(this.account, this.person).subscribe(result => {
            this.account.peopleOfInterest.push(JSON.parse(JSON.stringify(this.person)));
            this.accountsService.onAccountUpdate.next(this.account);

            this.hideModal();
        });
    }

    hideModal() {
        this.modal.hide();
    }

    public open() {
        if(this.modal)
            this.modal.show();
    }

    public close() {
        if(this.modal)
            this.modal.hide();
    }

    ngOnDestroy() {

    }
}
