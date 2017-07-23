import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';

import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthHttpExtended } from 'app/common/authentication';
import { AccountsService } from '../../../../services/accounts.service';
import { Account, AccountStates, AccountCustomer } from '../../../../models/accounts';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import * as fromRoot from 'app/app.store';
import * as accountsStore from 'app/sales/accounts/store/accounts';
import { Store, Action, Dispatcher } from "@ngrx/store";
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from "rxjs/Observable";

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
        private actions$: Actions,
        private store: Store<fromRoot.State>,
        private dispatcher: Dispatcher,
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

        this.dispatcher.subscribe(action => {
            if(action instanceof accountsStore.actions.AddResult) {
                if(action.payload.success) {
                    this.close();

                    this.router.navigateByUrl(`/sales/accounts/${action.payload.account.alias}`);
                }
            }
        });

        this.store.dispatch(new accountsStore.actions.AddAction(this.account));
    }

    close() {
        this.onClosed.emit();
    }
}
