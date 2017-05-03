import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import Lead from 'app/leads/lead';

@Component({
    selector: 'lead-details',
    templateUrl: './lead-details.component.html',
    styles: [
        `.modal-content {
            border: none;
            border-radius: 0px;    
        }`
    ],
    encapsulation: ViewEncapsulation.None
})
export class LeadDetailsComponent {
    @ViewChild('modal')
    modal: ModalComponent;

    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: boolean = false;

    lead: Lead;

    opened() {

    }

    open() {
        this.modal.open();
    }

    closed() {

    }

    dismissed() {

    }
}