import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthHttpExtended } from 'app/common/authentication';
import { AccountsService } from '../../../../services/accounts.service';
import { Account, AccountStates, AccountCustomer } from '../../../../models/accounts';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
    selector: 'ccrm-sales-accounts-details-initial-editor',
    templateUrl: './initial-editor.component.html',
    styleUrls: ['./initial-editor.component.scss']
})
export class InitialEditorComponent implements OnInit, AfterViewInit {
    @ViewChild('accountLegalName') accountLegalName: ElementRef;

    account: Account = new Account();

    @Output() onClosed: EventEmitter<any> = new EventEmitter();

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
        if(this.accountLegalName && this.accountLegalName.nativeElement) {
            this.accountLegalName.nativeElement.focus();
            this.accountLegalName.nativeElement.select();
        }
    }

    onSave(form: NgForm): void {
        if(form.invalid)
            return;

        this.account.state = AccountStates.Published;

        this.accountsService.add(this.account)
        .subscribe(account => {
            if(account.id){
                this.account = account;

                this.close();

                this.router.navigateByUrl(`/sales/accounts/${this.account.alias}`);
            }
            else
                this.close();
        });
    }

    close() {
        this.onClosed.emit();
    }
}
