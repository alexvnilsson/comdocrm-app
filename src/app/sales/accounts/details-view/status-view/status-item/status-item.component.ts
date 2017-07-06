import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AccountStatus, Account } from '../../../accounts';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AccountsService, StatusUserTaskAddedEvent } from '../../../accounts.service';
import { UsersService } from 'app/common/users';
import { UserTask } from '../../../../../user-tasks/user-task/user-task';
import { SlideDownTransitionAnimation } from '../../../../../common/ui/animations/route-transition.animation';

export const STATUS_MESSAGE_TRIMMED_MAX_LENGTH = 64;

@Component({
    selector: 'ccrm-sales-accounts-status-item',
    templateUrl: './status-item.component.html',
    styleUrls: ['./status-item.component.scss'],
    animations: [
        SlideDownTransitionAnimation,
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

    @Input('light') lightMode: boolean;

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
        private usersService: UsersService,
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

    onRemoveStatus() {
        this.accountsService.deleteStatus(this.account, this.status).subscribe();
    }

    onRemoveUserTask(userTask: UserTask, event: Event) {
        this.accountsService.deleteUserTask(this.account, this.status, userTask).subscribe();
    }

    private trimMessageStatusText(noTrim?: boolean) {
        if (this.status && this.status.messageBody && noTrim !== true) {
            var statusWords = this.status.messageBody.split(' ');

            if (statusWords.length >= STATUS_MESSAGE_TRIMMED_MAX_LENGTH)
                return `${statusWords.splice(0, STATUS_MESSAGE_TRIMMED_MAX_LENGTH).join(' ')}...`;
        }

        return this.status.messageBody;
    }

    private isMessageStatusTextTrimmable() {
        if(this.status && this.status.messageBody) {
            var statusWordLength = this.status.messageBody.split(' ').length;

            return statusWordLength >= STATUS_MESSAGE_TRIMMED_MAX_LENGTH;
        }

        return null;
    }

    private isStatusMessageTextTrimmed(statusMessage: string): boolean {
        if(this.status && this.status.messageBody)
            return statusMessage.split(' ').length < this.status.messageBody.split(' ').length;
        else
            return null;
    }

    showAllStatusMessageText(event: Event) {
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

        event.preventDefault();
        return false;
    }

    ngOnDestroy() {
        if(this.onUserTaskAddedListener)
            this.onUserTaskAddedListener.unsubscribe();
    }
}
