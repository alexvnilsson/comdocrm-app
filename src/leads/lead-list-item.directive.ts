import { Directive, Input } from '@angular/core';

import { Lead } from 'leads/leads';

@Directive({
    selector: '[leadListItem]',
    host: {
        'role': 'button'
    }
})
export class LeadListItemDirective {
    @Input() lead: Lead;
}
