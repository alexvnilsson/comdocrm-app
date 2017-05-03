import { Component, Input } from '@angular/core';

import Lead from 'app/leads/lead';

@Component({
    selector: 'lead-list-item',
    template: `<tr role="button"> 
                <td>{{ lead.name }}</td>
                <td>{{ lead.company.name }}</td>
            </tr>`
})
export class LeadListItemComponent {
    @Input() lead: Lead;
}
