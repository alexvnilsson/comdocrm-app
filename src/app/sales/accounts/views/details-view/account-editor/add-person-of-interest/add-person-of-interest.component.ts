import { Component, OnInit, AfterViewInit, AfterContentInit, OnDestroy, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { AccountsService, AccountUpdateResult } from '../../../../services/accounts.service';
import { Account, AccountPersonOfInterest } from '../../../../models/accounts';
import { NgForm } from "@angular/forms/forms";

@Component({
    selector: 'ccrm-accounts-add-person-of-interest',
    templateUrl: './add-person-of-interest.component.html'
})
export class AddPersonOfInterestComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
    @ViewChild('modal') modal: ModalDirective;
    @ViewChild('contactFullName') contactFullNameInput: ElementRef;

    @Output() onSaved: EventEmitter<{ account: Account, person: AccountPersonOfInterest }> = new EventEmitter();
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

    savePersonOfInterest(form: NgForm) {
        if(form.form.invalid)
            return false;

        this.onSaved.emit({
            account: this.account,
            person: this.person
        });
        
        this.onClosed.emit();
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
