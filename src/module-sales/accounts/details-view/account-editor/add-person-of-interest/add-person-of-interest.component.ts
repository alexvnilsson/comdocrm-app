import { Component, OnInit, AfterViewInit, AfterContentInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { AccountsService, AccountUpdateResult } from '../../../accounts.service';
import { Account, AccountPersonOfInterest } from '../../../../models/account';
import { FormState } from '../../../../../common/ui/views/form-state';

@Component({
    selector: 'ccrm-accounts-add-person-of-interest',
    templateUrl: './add-person-of-interest.component.html'
})
export class AddPersonOfInterestComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
    @ViewChild('modal') modal: ModalDirective;
    @ViewChild('contactFullName') contactFullNameInput: ElementRef;

    account: Account;
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
        this.activatedRoute.parent.params.subscribe(params => {
            if(params.slug)
                this.accountsService.getById(params.slug).subscribe(this.onAccountLoad.bind(this));
        });
    }

    onAccountLoad(account: Account) {
        this.account = account;

        this.formState.isLoading = false;
    }

    onAccountLoadError(message: string, code: string) {
        this.formState.isLoading = false;
        this.formState.hasErrors = true;
    }

    ngAfterViewInit() {
        this.modal.show();

        this.modal.onShown.subscribe(() => {
            this.contactFullNameInput.nativeElement.focus();
        });

        this.modal.onHidden.subscribe(() => {
            
        });
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

        this.router.navigate(['.', { outlets: { modal: null } }], { relativeTo: this.activatedRoute.parent } );
    }

    ngOnDestroy() {

    }
}
