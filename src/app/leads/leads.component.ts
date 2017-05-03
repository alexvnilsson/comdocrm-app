import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { LeadsService, Lead } from 'app/leads/leads.service';

@Component({
    selector: 'leads-root',
    templateUrl: './leads.component.html'
})
export class LeadsComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;

    leads: Array<any>;


    constructor(private leadsService: LeadsService) {}

    ngOnInit() {
        this.leadsService.getLeads().subscribe(
            leads => {
                this.leads = leads;
            }
        );
    }

    openLead(lead: Lead) {
        this.modal.open();
    }
}
