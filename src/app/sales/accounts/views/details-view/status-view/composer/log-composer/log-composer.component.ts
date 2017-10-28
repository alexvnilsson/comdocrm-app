import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
import * as moment from 'moment';

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
            state('false', style({
              display: 'none'
            })),
            transition('0 => 1', [
                animate(500, keyframes([
                    style({ opacity: 0, transform: 'translateY(-100%)', height: 0, offset: 0 }),
                    style({ opacity: 0, transform: 'translateY(-10%)', height: 'auto', offset: 0.33 }),
                    style({ opacity: 1, transform: 'translateY(0%)', offset: 1 })
                ]))
            ]),
            transition('1 => 0', [
                animate(500, keyframes([
                    style({ opacity: 1, transform: 'translateY(0%)', offset: 0 }),
                    style({ opacity: 0, transform: 'translateY(-10%)', offset: 0.33 }),
                    style({ opacity: 0, transform: 'translateY(-100%)', height: 0, offset: 1 })
                ]))
            ])
        ]),
    ]
})
export class LogComposerComponent implements OnInit, OnChanges {
    @Input() isOpen: boolean;

    @ViewChild('logForm') logForm: NgForm;

    @ViewChild('logHeaderText') logHeaderText: ElementRef;
    @ViewChild('publicationDate') publicationDate: DatepickerDirective;

    @Output() onSaved: EventEmitter<{ account: Account, status: AccountStatus }> = new EventEmitter();
    @Output() onClosed: EventEmitter<any> = new EventEmitter();

    @Input() account: Account;

    dateToday: moment.Moment;
    dateSelected: moment.Moment;

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
        this.dateToday = moment(new Date());
        this.dateSelected = moment(new Date());

        this.usersService.getProfile().subscribe(profile => {
            this.userProfile = profile;
        });
    }

    ngOnChanges(changes) {

    }

    onTransitionFinished(event: Event) {
      if (this.isOpen) {
        this.logHeaderText.nativeElement.focus();
      }
    }

    onDateChanged(event: Date) {
        if (event) {
            this.dateSelected = moment(event);
        }
    }

    onLogDelayCancel() {
        this.status.publicationDate = this.dateToday.toDate();
        this.onDateChanged(this.status.publicationDate);
    }

    onFormSubmit(logForm: NgForm) {
        if (this.account && logForm.valid) {
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

        if (this.logForm) {
          this.logForm.resetForm();
        }
    }

    isDateToday(): boolean {
      return this.dateSelected.isSame(this.dateToday, 'day');
    }
}
