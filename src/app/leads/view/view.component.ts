import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ModalDirective } from 'ngx-bootstrap';

import { LeadsService } from 'app/leads/leads.service';
import Lead from 'app/leads/lead';
import LeadStatus from 'app/leads/status/leadStatus';

import { TimelineAddMessageComponent } from './timeline-add-message.component';

@Component({
    selector: 'leads-view',
    templateUrl: './view.component.html',
    styles: [
        ``
    ]
})
export class ViewComponent implements OnInit {
    @ViewChild('addMessage')
    addMessage: TimelineAddMessageComponent;

    @Input() lead: Lead;
    statusTable: Array<LeadStatus>;

    constructor(private route: ActivatedRoute, private leadsService: LeadsService) {}

    ngOnInit() {
        let id = this.route.snapshot.params['id'];

        if(id != undefined) {
            this.leadsService.getLead(id).subscribe(lead => this.lead = lead);

            this.leadsService.getLeadStatusTable().subscribe(statusTable => {
                this.statusTable = statusTable;
            });
        }
    }

    setLeadStatus(statusId: number) {
        this.leadsService.setStatus(this.lead, statusId);
    }

    openAddMessage() {
        this.addMessage.open();
    }
}