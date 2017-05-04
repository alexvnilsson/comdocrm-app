import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

import Lead from 'app/leads/lead';

@Component({
    selector: 'leads-timeline-add-message',
    templateUrl: './timeline-add-message.component.html',
    styles: [
        ``
    ],
    encapsulation: ViewEncapsulation.None
})
export class TimelineAddMessageComponent {
    @ViewChild('addMessageModal')
    modal: ModalDirective;

    open() {
        this.modal.show();
    }

    opened() {

    }

    closed() {

    }

    dismissed() {
        this.closed();
    }
}