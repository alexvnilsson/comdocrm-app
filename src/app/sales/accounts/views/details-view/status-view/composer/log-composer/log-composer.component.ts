import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';

import { AccountsService, AccountUpdateResult } from '../../../../../services/accounts.service';
import { Account, AccountStatus } from '../../../../../models/accounts';
import { RouteTransitionAnimation, SlideDownTransitionAnimation } from 'app/common/ui/animations/route-transition.animation';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'app/common/users';
import * as Auth0 from 'auth0-js';
import { DatepickerDirective } from 'app/common/ui/components/datepicker/datepicker.directive';
import { User } from 'app/common/users/user';

@Component({
    selector: 'ccrm-sales-accounts-status-composer-log',
    templateUrl: './log-composer.component.html',
    styleUrls: ['./log-composer.component.scss'],
    animations: [
        SlideDownTransitionAnimation,
        trigger('editorTransition', [
            transition('void => *', [
                animate(500, keyframes([
                    style({ opacity: 0, transform: 'translateY(-100%)', height: 0, offset: 0 }),
                    style({ opacity: 0, transform: 'translateY(-10%)', height: 'auto', offset: 0.33 }),
                    style({ opacity: 1, transform: 'translateY(0%)', offset: 1 })
                ]))
            ]),
            transition('* => void', [
                animate(500, keyframes([
                    style({ opacity: 1, transform: 'translateY(0%)', offset: 0 }),
                    style({ opacity: 0, transform: 'translateY(-10%)', offset: 0.33 }),
                    style({ opacity: 0, transform: 'translateY(-100%)', height: 0, offset: 1 })
                ]))
            ])
        ]),
    ]
})
export class LogComposerComponent implements OnInit, OnChanges, AfterViewInit {
    @ViewChild('logHeaderText') logHeaderText: ElementRef;
    @ViewChild('logDelayDate') logDelayDate: DatepickerDirective;

    @Output() onSaved: EventEmitter<{ account: Account, status: AccountStatus }> = new EventEmitter();
    @Output() onClosed: EventEmitter<any> = new EventEmitter();

    @Input() account: Account;

    dateNextDay: Date = null;
    userProfile: User = null;
    status: AccountStatus = {
        publicationDate: null,
        messageHeader: '',
        messageBody: '',
        messageFooter: ''
    };

    constructor(
        private accountsService: AccountsService,
        private usersService: UsersService,
        private location: Location,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.dateNextDay = new Date();
        this.dateNextDay.setDate(this.dateNextDay.getDate() + 1);

        this.usersService.getProfile().subscribe(profile => {
            this.userProfile = profile
        });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.logHeaderText.nativeElement.focus();
        }, 200);
    }

    ngOnChanges(changes) {
        
    }

    onLogDelayed(event: Date) {
        if(event)
            this.status.isDelayed = true;
        else
            this.status.isDelayed = false;
    }

    onLogDelayCancel() {
        this.logDelayDate.onClearDate();
    }

    onFormSubmit(logForm: NgForm) {
        if(this.account && logForm.valid) {
            this.onSaved.emit({
                account: this.account,
                status: this.status
            });

            this.onComposingFinished();
        }
    }

    onLogEntrySaved(statusForm: NgForm) {
        this.onComposingFinished();
    }

    onComposingFinished() {
        this.onClosed.emit();
    }
}
