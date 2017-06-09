import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

import { AccountsService } from '../accounts.service';
import { UserTasksService, UserTaskChangedEvent } from 'comdocrm-lib-user-task';

import { Account, AccountStatus } from '../account';
import { AccountEditorComponent } from './account-editor/account-editor.component';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from 'app/i18n/translate.service';
import { TabsTabDirective } from 'app/ui/component/tabs-tab.directive';

import { UserTaskItemComponent, UserTask } from 'comdocrm-lib-user-task'

import { RouteTransitionAnimation } from 'app/ui/animations';

@Component({
    selector: 'app-account-view',
    templateUrl: './account-view.component.html',
    styleUrls: ['./account-view.component.scss'],
    animations: [
        RouteTransitionAnimation,
        trigger('tabsTabTransition', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate('200ms 100ms', keyframes([
                    style({ opacity: 0, transform: 'translateY(-10%)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateY(0%)', offset: 1 })
                ]))
            ]),
            transition('* => void', [
                animate('200ms', keyframes([
                    style({ opacity: 1, offset: 0 }),
                    style({ opacity: 0, offset: 1 })
                ]))
            ])
        ])
    ]
})
export class AccountViewComponent implements OnInit, OnDestroy {
    @ViewChild('accountEditor') accountEditor: AccountEditorComponent;
    account: Account;
    userTasks: UserTask[] = [];

    state = {
        secondary: {
            tab: null
        }
    };

    private onAccountUpdateListener: Subscription;
    private onUserTaskChangedListener: Subscription;

    constructor(
        private activatedRouter: ActivatedRoute,
        private accountsService: AccountsService,
        private userTasksService: UserTasksService,
        private router: Router,
        private translate: TranslateService
    ) { }

    ngOnInit() {
        this.translate.getModuleTranslation('sales');

        this.activatedRouter.params.subscribe(params => {
            let accountSlug = params.slug;

            this.accountsService.getBySlug(accountSlug, this.onAccountLoad.bind(this), this.onAccountLoadError.bind(this));
        });

        

        this.onUserTaskChangedListener = this.userTasksService.OnUserTaskChanged.subscribe((changed: UserTaskChangedEvent) => {
            console.log(this.userTasksService.getAll());

            this.userTasks = this.userTasksService.getAll();
        });

        this.userTasksService.add("Detta ska vi göra", "Summary");

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

    getSortedAccountStatuses(statuses: Array<AccountStatus>) {
        return statuses.sort((a: AccountStatus, b: AccountStatus) => { return +(b.publicationDate > a.publicationDate) || +(b.publicationDate == a.publicationDate) - 1; })
    }

    getActiveTab(): number {
        if(this.state && this.state.secondary && this.state.secondary.tab)
            return this.state.secondary.tab;
        else
            return null;
    }

    isActiveTab(tab: TabsTabDirective): boolean {
        if(this.state && this.state.secondary && this.state.secondary.tab)
            return this.state.secondary.tab == tab.getIndex();
        else
            return null;
    }

    onTabClicked(tab: TabsTabDirective) {
        this.state.secondary.tab = tab.getIndex();
    }

    ngOnDestroy() {
        this.onAccountUpdateListener.unsubscribe();
        this.onUserTaskChangedListener.unsubscribe();
    }
}
