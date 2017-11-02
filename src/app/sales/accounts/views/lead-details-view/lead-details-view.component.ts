import { Component, OnInit, Input } from '@angular/core';
import { AccountLead } from 'app/sales/accounts/models/accounts';

@Component({
  selector: 'ccrm-sales-accounts-lead-details-view',
  templateUrl: './lead-details-view.component.html'
})
export class LeadDetailsViewComponent implements OnInit {
  @Input() lead: AccountLead;

  constructor() { }

  ngOnInit() { 
    
  }

}
