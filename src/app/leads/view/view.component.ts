import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ModalDirective } from 'ngx-bootstrap';

import { LeadsService } from 'app/leads/leads.service';
import Lead from 'app/leads/lead';

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

    lead: Lead;

    constructor(private route: ActivatedRoute, private leadsService: LeadsService) {}

    ngOnInit() {
        let id = this.route.snapshot.params['id'];

        if(id != undefined) {
            this.leadsService.getLead(id).subscribe(lead => this.lead = lead);
        }
    }

    openAddMessage() {
        this.addMessage.open();
    }
}