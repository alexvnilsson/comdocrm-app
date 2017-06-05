import { Component, OnInit, AfterViewInit, AfterContentInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { AccountsService, AccountUpdateResult } from '../../accounts.service';
import { Account, AccountStatus } from '../../account';

@Component({
    selector: 'app-add-status',
    templateUrl: './add-status.component.html',
    styleUrls: ['./add-status.component.scss']
})
export class AddStatusComponent implements OnInit, AfterViewInit {
    @ViewChild('modal') modal: ModalDirective;
    account: Account;

    public statusModel: AccountStatus = {
        publicationDate: new Date(),
        headerText: 'Status update',
        messageText: '',
        footerText: ''
    }

    public state = {
        loading: true,
        error: null
    };

    constructor(private accountsService: AccountsService, private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if(params.slug != null) {
                this.accountsService.getBySlug(params.slug, this.onAccountLoaded.bind(this));
            }
        })
    }

    ngAfterViewInit() {
        this.modal.show();

        this.modal.onHidden.subscribe(() => {
            this.location.back();
        });
    }

    onAccountLoaded(account: Account) {
        this.account = account;

        this.state.loading = false;
    }

    onStatusSaved(statusForm: NgForm) {
        console.log("saved", this.statusModel);

        this.accountsService.addStatusToAccount(this.account, this.statusModel, (result: AccountUpdateResult) => {

        });
    }

    hideModal() {
        this.modal.hide();
    }

}
