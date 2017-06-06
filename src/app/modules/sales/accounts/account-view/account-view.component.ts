import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../accounts.service';
import { Account, AccountStatus } from '../account';
import { AccountEditorComponent } from './account-editor/account-editor.component';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from 'app/i18n/translate.service';

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
        private router: Router,
        private translate: TranslateService
    ) { }

    ngOnInit() {
        this.translate.getModuleTranslation('sales').subscribe(trans => {
            console.log("using " + trans);
        })

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

    getSortedAccountStatuses(statuses: Array<AccountStatus>) {
        return statuses.sort((a: AccountStatus, b: AccountStatus) => { return +(b.publicationDate > a.publicationDate) || +(b.publicationDate == a.publicationDate) - 1; })
    }

    ngOnDestroy() {
        this.onAccountUpdateListener.unsubscribe();
    }
}
