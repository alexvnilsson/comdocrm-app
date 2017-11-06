import { AccountPersonOfInterest } from 'app/sales/accounts/models/accounts';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Account } from 'app/sales/accounts/models/accounts/accounts';

@Component({
  selector: 'ccrm-account-details-view-side-panel',
  templateUrl: './details-view-side-panel.component.html',
  styleUrls: ['./details-view-side-panel.component.scss']
})
export class DetailsViewSidePanelComponent implements OnInit {
  @Input() account: Account;

  @Output() onModalOpen: EventEmitter<string> = new EventEmitter();

  @Output() onPersonOfInterestAdded: EventEmitter<{ account: Account, person: AccountPersonOfInterest }> = new EventEmitter();
  @Output() onPersonOfInterestDeleted: EventEmitter<{ account: Account, person: AccountPersonOfInterest }> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
