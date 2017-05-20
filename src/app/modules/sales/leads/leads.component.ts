import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';

import { RouteTransitionAnimation } from 'app/ui/animations';

import { SlugifyService } from 'app/slugify.service';
import { LeadsService } from './leads.service';

import { Lead } from './';

@Component({
    selector: 'leads-root',
    templateUrl: './leads.component.html',
    animations: [
        RouteTransitionAnimation
    ],
    host: {
        '[@routeTransition]': ''
    }
})
export class LeadsComponent implements OnInit {
    leads: Array<any>;

    constructor(private router: Router, private slug: SlugifyService, private leadsService: LeadsService) {
        
    }

    ngOnInit() {
        this.leadsService.getLeads(this.leadsOnLoad.bind(this));
    }

    leadsOnLoad(leads: Array<Lead>) {
        this.leads = leads;
    }

    openLead(lead: Lead) {
        this.router.navigate(['sales/leads', lead.company.slug, lead.slug, lead._id ]);
    }
}
