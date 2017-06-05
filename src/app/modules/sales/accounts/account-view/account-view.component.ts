import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../accounts.service';
import { Account } from '../account';
import { AccountEditorComponent } from './account-editor/account-editor.component';
import { Subscription } from 'rxjs/Subscription';

import { RouteTransitionAnimation } from 'app/ui/animations';

@Component({
    selector: 'app-account-view',
    templateUrl: './account-view.component.html',
    styleUrls: ['./account-view.component.scss'],
    animations: [RouteTransitionAnimation],
    host: {
        '[@routeTransition]': 'true'
    }
})
export class AccountViewComponent implements OnInit, OnDestroy {
    @ViewChild('accountEditor') accountEditor: AccountEditorComponent;
    account: Account;

    private onAccountUpdateListener: Subscription;

    constructor(
        private activatedRouter: ActivatedRoute,
        private accountsService: AccountsService,
        private router: Router
    ) { }

    ngOnInit() {
        this.activatedRouter.params.subscribe(params => {
            let accountSlug = params.slug;

            this.accountsService.getBySlug(accountSlug, this.onAccountLoad.bind(this), this.onAccountLoadError.bind(this));
        });

        this.onAccountUpdateListener = this.accountsService.onAccountUpdate.subscribe(this.onAccountUpdate.bind(this));
    }

    onAccountLoad(account: Account) {
        this.account = account;
    }

    onAccountLoadError() {

    }

    onAccountUpdate(account: Account) {
        this.account = account;
    }

    onEditAccount() {
        this.router.navigate(['/sales/accounts', { outlets: { 'modal': ['edit', this.account.slug] } }]);
    }

    onAddStatusMessage() {
        this.router.navigate(['/sales/accounts', { outlets: { 'modal': ['status-add', this.account.slug] } }]);
    }

    ngOnDestroy() {
        this.onAccountUpdateListener.unsubscribe();
    }
}
