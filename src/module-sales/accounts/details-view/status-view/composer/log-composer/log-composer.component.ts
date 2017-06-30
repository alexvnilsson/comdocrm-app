import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';

import { AccountsService, AccountUpdateResult } from '../../../../accounts.service';
import { Account, AccountStatus } from '../../../../../models/account';
import { RouteTransitionAnimation } from '../../../../../../common/ui/animations/route-transition.animation';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'common/users';
import * as Auth0 from 'auth0-js';
import { DatepickerDirective } from '../../../../../../common/ui/components/datepicker/datepicker.directive';

@Component({
    selector: 'ccrm-sales-accounts-status-composer-log',
    templateUrl: './log-composer.component.html',
    styleUrls: ['./log-composer.component.scss'],
    animations: [
        RouteTransitionAnimation,
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

    @Output() onEntrySubmitted: EventEmitter<any> = new EventEmitter();

    account: Account;

    dateNextDay: Date = null;
    userProfile: Auth0.Auth0UserProfile = null;
    status: AccountStatus = {
        publicationDate: null,
        messageHeader: '',
        messageBody: '',
        messageFooter: ''
    };

    constructor(
        private accountsService: AccountsService,
        private usersService: UsersService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.dateNextDay = new Date();
        this.dateNextDay.setDate(this.dateNextDay.getDate() + 1);

        this.route.parent.params.subscribe(params => {
            if(params.slug)
                this.accountsService.getByNameIdentity(params.slug).subscribe(account => this.account = account);
        });

        this.usersService.getProfile().subscribe(profile => {
            this.userProfile = profile
        });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.logHeaderText.nativeElement.focus();
        }, 100);
    }

    ngOnChanges(changes) {
        console.log(changes);
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
            this.accountsService.addStatus(this.account, this.status).subscribe();

            this.onComposingFinished();
        }
    }

    onLogEntrySaved(statusForm: NgForm) {
        this.onComposingFinished();
    }

    onComposingFinished() {
        this.router.navigate(['.', { outlets: { compose: null } }], { relativeTo: this.route.parent } );
    }
}
