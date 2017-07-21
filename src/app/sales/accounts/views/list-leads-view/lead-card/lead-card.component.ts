import { Account, AccountLead } from '../../../models/accounts';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
    } from '@angular/core';
import { FadeInOut } from 'app/common/ui/animations';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'ccrm-sales-accounts-lead-card',
  templateUrl: './lead-card.component.html',
  styleUrls: ['./lead-card.component.scss'],
  animations: [
      FadeInOut
  ]
})
export class LeadCardComponent implements OnInit {
  @Input('lead') lead: AccountLead;

  @Output() onImported: EventEmitter<AccountLead> = new EventEmitter();
  @Output() onClosed: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
      
  }

}
