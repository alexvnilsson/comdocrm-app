import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AccountStatus } from '../../../account';
import { XmlEntities } from 'html-entities';

@Component({
    selector: 'app-status-item',
    templateUrl: './status-item.component.html',
    styleUrls: ['./status-item.component.scss'],
    animations: [
        trigger('fadeIn', [
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
    private TrimmedMessageTextLength = 64;

    state: string = 'active';
    @Input() status: AccountStatus;

    statusMessage = {
        messageText: null,
        trimmed: false,
        canTrim: false
    };

    constructor(private changeDetector: ChangeDetectorRef) {

    }

    ngOnInit() {
        var trimmedMessageText = this.trimMessageStatusText();

        this.statusMessage = {
            messageText: trimmedMessageText,
            trimmed: this.isStatusMessageTextTrimmed(trimmedMessageText),
            canTrim: this.isMessageStatusTextTrimmable()
        };
    }

    ngAfterViewInit() {
        this.state = 'active';
    }

    private trimMessageStatusText(noTrim?: boolean) {
        if (this.status && this.status.messageText && noTrim !== true) {
            var statusWords = this.status.messageText.split(' ');

            if (statusWords.length >= this.TrimmedMessageTextLength)
                return `${statusWords.splice(0, this.TrimmedMessageTextLength).join(' ')}...`;
        }

        return this.status.messageText;
    }

    private isMessageStatusTextTrimmable() {
        if(this.status && this.status.messageText) {
            var statusWordLength = this.status.messageText.split(' ').length;

            return statusWordLength >= this.TrimmedMessageTextLength;
        }

        return null;
    }

    private isStatusMessageTextTrimmed(statusMessage: string): boolean {
        return statusMessage.split(' ').length < this.status.messageText.split(' ').length;
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
