import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthHttpExtended } from 'app/common/authentication';
import { AccountsService } from '../../../accounts.service';
import { Account, AccountStates, AccountCustomer } from '../../../accounts';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
    selector: 'ccrm-sales-accounts-details-initial-editor',
    templateUrl: './initial-editor.component.html',
    styleUrls: ['./initial-editor.component.scss']
})
export class InitialEditorComponent implements OnInit, AfterViewInit {
    @ViewChild('modal') modal: ModalDirective;

    @ViewChild('accountLegalName') accountLegalName: ElementRef;

    account: Account = new Account();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private http: AuthHttpExtended,
        private accountsService: AccountsService
    ) { }

    ngOnInit() {
        this.account.customer = new AccountCustomer();
    }

    ngAfterViewInit() {
        this.modal.show();

        this.modal.onShown.subscribe(event => {
            this.accountLegalName.nativeElement.focus();
            this.accountLegalName.nativeElement.select();
        });

        this.modal.onHidden.subscribe(event => {
            if(!this.account.id)
                this.location.back();
        });
    }

    onSave(form: NgForm): void {
        if(form.invalid)
            return;

        this.account.state = AccountStates.Published;

        this.accountsService.createAccount(this.account)
        .subscribe(account => {
            if(account.id){
                this.account = account;

                this.modal.hide();

                this.router.navigateByUrl(`/sales/accounts/${this.account.alias}`);
            }
            else
                this.modal.hide();
        });
    }

    close() {
        this.modal.hide();
    }
}
