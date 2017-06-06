import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';

import { TranslateService } from 'app/i18n/translate.service';
import { AccountsService, AccountUpdateResult } from '../../../accounts.service';

import { Account, AccountStatus } from '../../../account';

@Component({
    selector: 'app-blank-status-item',
    templateUrl: './blank-status-item.component.html',
    styleUrls: ['./blank-status-item.component.scss'],
    animations: [
        trigger('editorTransition', [
            transition('void => *', [
                animate(500, keyframes([
                    style({ opacity: 0, transform: 'translateY(-100%)', height: 0, offset: 0 }),
                    style({ opacity: 0, transform: 'translateY(-20%)', height: 'auto', offset: 0.33 }),
                    style({ opacity: 1, transform: 'translateY(0%)', offset: 1 })
                ]))
            ]),
            transition('* => void', [
                animate(500, keyframes([
                    style({ opacity: 1, transform: 'translateY(0%)', offset: 0 }),
                    style({ opacity: 0, transform: 'translateY(-20%)', offset: 0.33 }),
                    style({ opacity: 0, transform: 'translateY(-100%)', height: 0, offset: 1 })
                ]))
            ])
        ]),
    ]
})
export class BlankStatusItemComponent implements OnInit {
    @Input() account: Account;

    status: AccountStatus = {
        publicationDate: null,
        headerText: '',
        messageText: '',
        footerText: ''
    };

    editState = {
        isEditing: false,
        waitStopEditing: false
    };

    constructor(
        private translate: TranslateService,
        private accountsService: AccountsService
    ) { }

    ngOnInit() {
        
    }

    onFormSubmit(statusForm: NgForm) {
        if(statusForm.valid) {
            this.status.publicationDate = new Date();

            this.accountsService.addStatusToAccount(this.account, this.status, (result: AccountUpdateResult) => {
                if(result.updated)
                    this.onStatusSavedSuccess(statusForm);
            });
        } else {
            console.log("not valid");
        }
    }

    onStatusSavedSuccess(statusForm: NgForm) {
        statusForm.resetForm();
        this.editState.isEditing = false;
    }

    onInputFocus() {
        this.editState.isEditing = true;
        this.editState.waitStopEditing = false;
    }

    onInputBlur() {
        if(
            this.status && 
            (
                (this.status.headerText && this.status.headerText.length > 0) ||
                (this.status.messageText && this.status.messageText.length > 0)
            )
         )
         {} else {
            this.editState.waitStopEditing = true;
            setTimeout(this.onInputBlurAfterWait.bind(this), 200);
        }
    }

    onInputBlurAfterWait() {
        if(this.editState.waitStopEditing)
            this.editState.isEditing = false; 
    }
}
