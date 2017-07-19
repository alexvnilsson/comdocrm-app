import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Account } from '../../../models/accounts';

@Component({
  selector: 'ccrm-sales-accounts-lead-card',
  templateUrl: './lead-card.component.html',
  styleUrls: ['./lead-card.component.scss']
})
export class LeadCardComponent implements OnInit {
  @Input() account: Account;

  @Output() onClosed: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
