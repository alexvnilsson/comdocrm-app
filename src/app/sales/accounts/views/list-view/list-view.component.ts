import { Observable } from 'rxjs/Observable';
import { Component, OnInit, EventEmitter, Input, Output, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteTransitionAnimation, DoneLoadingTransitionAnimation } from 'app/common/ui/animations';
import { Subscription } from 'rxjs/Subscription';

import { UiState } from 'app/common/interfaces/ui-state.interface';

import { AccountsService } from '../../services/accounts.service';
import { AccountSourcesService } from '../../services/account-sources.service';
import { UsersService } from 'app/common/users';

import { Account, AccountLead, AccountSource } from '../../models/accounts';

export interface AccountListState {
    accountSource?: AccountSource;
}

export const USER_STATE = {
    ACCOUNT_SOURCE: 'Sales_Accounts_Source'
};

@Component({
    selector: 'ccrm-sales-accounts-list-view',
    templateUrl: './list-view.component.html',
    styleUrls: ['./list-view.component.scss'],
    animations: [RouteTransitionAnimation, DoneLoadingTransitionAnimation]
})
export class ListViewComponent implements OnInit, AfterContentInit {
    @Input() accounts: Account[];
    accountSources: Array<AccountSource>;

    @Input() leads: AccountLead[];
    leadSources: { [key: string]: LeadSource } = {};


    @Output() onModalOpen: EventEmitter<string> = new EventEmitter();
    @Input() modalOpen$: string = null;

    @Output() onAccountImported: EventEmitter<AccountLead> = new EventEmitter();

    uiState: UiState = new UiState(true);

    listState: AccountListState = {
        accountSource: null
    };

    onAccountSourceChange: EventEmitter<AccountSource> = new EventEmitter();

    private onAccountSourceChangeListener: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private accountsService: AccountsService,
        private accountSourcesService: AccountSourcesService,
        private usersService: UsersService
    ) { }

    ngOnInit() {

    }

    ngAfterContentInit() {

    }

    uiOnComplete() {

    }

    uiOnError(error: Error) {
        this.uiState.onError(error);
    }

    onCreateAccount() {
        this.router.navigate([{ outlets: { 'account': [ 'create' ] } } ], { relativeTo: this.route });
    }

    onAccountClicked(account: Account, event: Event) {
        if (account) {
            this.accountsService.navigateTo(account);
        }

        return false;
    }

    onAccountSourceChanged(source: AccountSource) {

    }

    /* End Account events */

    protected getLeadSources() {
      let sources: { [key:string]: LeadSource } = {};
      let sourcesUnsorted = [...this.leads.map(item => item.source)];

      sourcesUnsorted.forEach(source => {
        if (typeof sources[source.slug] === 'undefined') {
          sources[source.slug] = { slug: source.slug, label: source.displayName, count: 0 };
        }

        sources[source.slug].count++;
      });

      this.leadSources = sources;

      return sources;
    }

    /* Account source events */

    onUserStateLoaded(state: any) {
        if (state[USER_STATE.ACCOUNT_SOURCE]) {
            this.accountSources.forEach((source: AccountSource) => {
                if (source.id === state[USER_STATE.ACCOUNT_SOURCE]) {
                    this.listState.accountSource = source;
                }
            })
        }
    }

    /* End Account source events */

    /* Account source methods */

    isFilterAccepting(account: Account) {
        if (this.listState.accountSource) {
            if (account.source && account.source.id) {
                if (this.listState.accountSource.id === account.source.id) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        return true;
    }

    setAccountSource(source?: AccountSource, reset?: boolean) {
        let shouldEmit = false;

        if(this.listState.accountSource && this.listState.accountSource !== source) {
            shouldEmit = true;
        }

        if (source && source.id) {
            this.listState.accountSource = source;

            this.usersService.setState(USER_STATE.ACCOUNT_SOURCE, source.id);

            if (shouldEmit) {
                this.onAccountSourceChange.next(source);
            }
        }

        if (reset) {
            this.listState.accountSource = null;
            this.usersService.setState(USER_STATE.ACCOUNT_SOURCE, null);
            this.onAccountSourceChange.next(null);
        }

        return false;
    }

    resetAccountSource() {
        return this.setAccountSource(null, true);
    }

    getAccountSourceName(noTrim?: boolean) {
        if (this.listState.accountSource) {
            const source: AccountSource = this.listState.accountSource;

            if (source.displayName.length > 16 && noTrim !== true) {
                return `${source.displayName.substr(0, 16)}...`;
            } else {
                return source.displayName;
            }
        }

        return null;
    }

    /* End Account source methods */
}

export interface LeadSource {
  slug: string;
  label: string;
  count: number;
}
