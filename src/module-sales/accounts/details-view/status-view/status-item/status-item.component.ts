import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AccountStatus } from '../../../../models/account';

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
export class StatusItemComponent implements OnInit, AfterViewInit {
    @Input() status: AccountStatus = null;

    statusMessage = {
        messageText: null,
        trimmed: false,
        canTrim: false
    };

    constructor(
        private changeDetector: ChangeDetectorRef
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
            
        }
    }

    ngAfterViewInit() {
        
    }

    private trimMessageStatusText(noTrim?: boolean) {
        if (this.status && this.status.messageText && noTrim !== true) {
            var statusWords = this.status.messageText.split(' ');

            if (statusWords.length >= STATUS_MESSAGE_TRIMMED_MAX_LENGTH)
                return `${statusWords.splice(0, STATUS_MESSAGE_TRIMMED_MAX_LENGTH).join(' ')}...`;
        }

        return this.status.messageText;
    }

    private isMessageStatusTextTrimmable() {
        if(this.status && this.status.messageText) {
            var statusWordLength = this.status.messageText.split(' ').length;

            return statusWordLength >= STATUS_MESSAGE_TRIMMED_MAX_LENGTH;
        }

        return null;
    }

    private isStatusMessageTextTrimmed(statusMessage: string): boolean {
        if(this.status && this.status.messageText)
            return statusMessage.split(' ').length < this.status.messageText.split(' ').length;
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
}
