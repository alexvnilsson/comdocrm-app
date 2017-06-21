import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AccountStatus, Account } from '../../../../models/account';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AccountsService, StatusUserTaskAddedEvent } from '../../../accounts.service';

export const STATUS_MESSAGE_TRIMMED_MAX_LENGTH = 64;

@Component({
    selector: 'ccrm-sales-accounts-status-item',
    templateUrl: './status-item.component.html',
    styleUrls: ['./status-item.component.scss'],
    animations: [
        trigger('statusItemTransition', [
            transition('void => *', [
                style({ opacity: 0, transform: 'translateY(-10%)' }),
                animate(250, style({ opacity: 1, transform: 'translateY(0%)' }))
            ]),
            transition('* => void', [
                style({ opacity: 1 }),
                animate(250, style({ opacity: 0 }))
            ])
        ]),
        trigger('messageTextTransitions', [
            state('in', style({ opacity: '0' })),
            transition(':enter', [
                style({ opacity: '0' }),
                animate(250, style({ opacity: '1' }))
            ]),
            transition(':leave', [
                style({ opacity: '1' }),
                animate(250, style({ opacity: '0' }))
            ]),
            transition('* => *', [
                style({ opacity: '0' }),
                animate(250, style({ opacity: '1' }))
            ])
        ]
    )]
})
export class StatusItemComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() account: Account = null;
    @Input() status: AccountStatus = null;

    statusMessage = {
        messageText: null,
        trimmed: false,
        canTrim: false
    };

    userTaskEditor = {
        isEditing: false
    };

    private onUserTaskAddedListener: Subscription;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private accountsService: AccountsService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        
    }

    ngOnInit() {
        if(this.status !== null) {
            var trimmedMessageText = this.trimMessageStatusText();

            this.statusMessage = {
                messageText: trimmedMessageText,
                canTrim: null,
                trimmed: null
            };

            this.statusMessage.canTrim = this.isMessageStatusTextTrimmable();
            this.statusMessage.trimmed = this.isStatusMessageTextTrimmed(trimmedMessageText);

            this.onUserTaskAddedListener = this.accountsService.onUserTaskAddedToStatus.subscribe((event: StatusUserTaskAddedEvent) => {
                if(event.status.id === this.status.id) {
                    
                }
            });
        }
    }

    ngAfterViewInit() {
        
    }

    clickAddReminder() {
        //this.router.navigate([ '.', { outlets: { 'modal': [ 'reminders-add', this.status.id, 'no-details' ] }} ], { relativeTo: this.route });

        this.userTaskEditor.isEditing = true;
    }

    private trimMessageStatusText(noTrim?: boolean) {
        if (this.status && this.status.message.body && noTrim !== true) {
            var statusWords = this.status.message.body.split(' ');

            if (statusWords.length >= STATUS_MESSAGE_TRIMMED_MAX_LENGTH)
                return `${statusWords.splice(0, STATUS_MESSAGE_TRIMMED_MAX_LENGTH).join(' ')}...`;
        }

        return this.status.message.body;
    }

    private isMessageStatusTextTrimmable() {
        if(this.status && this.status.message.body) {
            var statusWordLength = this.status.message.body.split(' ').length;

            return statusWordLength >= STATUS_MESSAGE_TRIMMED_MAX_LENGTH;
        }

        return null;
    }

    private isStatusMessageTextTrimmed(statusMessage: string): boolean {
        if(this.status && this.status.message.body)
            return statusMessage.split(' ').length < this.status.message.body.split(' ').length;
        else
            return null;
    }

    showAllStatusMessageText() {
        var trimmedMessageText = this.trimMessageStatusText(true);

        if (this.statusMessage) {
            if (this.statusMessage.trimmed)
                this.statusMessage = {
                    messageText: trimmedMessageText,
                    trimmed: this.isStatusMessageTextTrimmed(trimmedMessageText),
                    canTrim: this.isMessageStatusTextTrimmable()
                };
        }

        this.changeDetector.detectChanges();
    }

    showLessStatusMessageText() {
        var trimmedMessageText = this.trimMessageStatusText();

        if (this.statusMessage) {
            if (!this.statusMessage.trimmed)
                this.statusMessage = {
                    messageText: this.trimMessageStatusText(),
                    trimmed: this.isStatusMessageTextTrimmed(trimmedMessageText),
                    canTrim: this.isMessageStatusTextTrimmable()
                };
        }

        this.changeDetector.detectChanges();
    }

    ngOnDestroy() {
        this.onUserTaskAddedListener.unsubscribe();
    }
}
