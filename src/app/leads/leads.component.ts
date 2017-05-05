import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SlugifyService } from 'app/slugify.service';

import { LeadsService, Lead } from 'app/leads/leads.service';

@Component({
    selector: 'leads-root',
    templateUrl: './leads.component.html'
})
export class LeadsComponent implements OnInit {
    leads: Array<any>;

    constructor(private router: Router, private slug: SlugifyService, private leadsService: LeadsService) {}

    ngOnInit() {
        this.leadsService.getLeads().subscribe(
            leads => {
                this.leads = leads;
            }
        );
    }

    openLead(lead: Lead) {
        this.router.navigate(['/leads', this.slug.slugify(lead.name), lead._id ]);
    }
}
