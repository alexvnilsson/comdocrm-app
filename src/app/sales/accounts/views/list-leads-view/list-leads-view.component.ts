import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteTransitionAnimation, DoneLoadingTransitionAnimation } from 'app/common/ui/animations';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { UiState } from 'app/common/interfaces/ui-state.interface';

import { AccountLead, AccountSource } from '../../models/accounts';

export interface AccountListState {
    accountSource?: AccountSource;
}

export const USER_STATE = {
    ACCOUNT_SOURCE: 'Sales_Accounts_Source'
};

@Component({
    selector: 'ccrm-sales-accounts-list-leads-view',
    templateUrl: './list-leads-view.component.html',
    styleUrls: ['./list-leads-view.component.scss'],
    animations: [RouteTransitionAnimation, DoneLoadingTransitionAnimation],
    host: {
        '[@routeTransition]': ''
    }
})
export class ListLeadsViewComponent implements OnInit {
    @Input() leads: Observable<AccountLead[]>;
    
    selectedLead$: Observable<AccountLead>;

    @Output() onAccountImported: EventEmitter<AccountLead> = new EventEmitter();

    @Output() onModalOpen: EventEmitter<string> = new EventEmitter();
    @Input() modalOpen$: string = null;

    listState: AccountListState = {
        accountSource: null
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        
    }

    uiOnComplete() {

    }

    uiOnError(error: Error) {
        
    }

    onLeadClicked(lead: AccountLead, event: Event) {
        this.selectedLead$ = this.leads.map(a => a.find(b => b.id == lead.id));

        this.onModalOpen.emit('accounts_leads_leadCard');

        return false;
    }
}
