import { Directive, Input } from '@angular/core';

import { Lead } from 'app/leads/lead';

@Directive({
    selector: '[leadListItem]',
    host: {
        'role': 'button'
    }
})
export class LeadListItemDirective {
    @Input() lead: Lead;
}
