import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AccountsService } from '../accounts.service';
import { UsersService } from 'common/users';
import { UserTasksService, UserTask } from 'module-user-tasks';

import { Account, AccountStatus } from '../../models/account';
import { AddPersonOfInterestComponent } from './account-editor/add-person-of-interest';

import { TabDirective } from 'common/ui/directives/tab';

import { RouteTransitionAnimation } from 'common/ui/animations';

@Component({
    selector: 'ccrm-sales-accounts-details-view',
    templateUrl: './details-view.component.html',
    styleUrls: ['./details-view.component.scss'],
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
export class DetailsViewComponent implements OnInit, OnDestroy {
    @ViewChild('accountEditor') accountEditor: AddPersonOfInterestComponent;
    account: Account;
    userState: any;
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
        private usersService: UsersService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.usersService.getState().subscribe(state => this.userState = state);

        this.activatedRouter.params.subscribe(params => {
            let accountSlug = params.slug;

            if(accountSlug)
                this.accountsService.getBySlug(accountSlug).subscribe(this.onAccountLoad.bind(this));
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

    clickAddPersonOfInterest() {
        this.router.navigate([{ outlets: { 'modal': [ 'contacts-add', this.account.id ] } }], { relativeTo: this.route });
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

    isActiveTab(tab: TabDirective): boolean {
        if(this.state && this.state.secondary && this.state.secondary.tab)
            return this.state.secondary.tab == tab.getIndex();
        else
            return null;
    }

    onTabClicked(tab: TabDirective) {
        this.state.secondary.tab = tab.getIndex();
    }

    ngOnDestroy() {
        this.onAccountUpdateListener.unsubscribe();
        this.onUserTaskChangedListener.unsubscribe();
    }
}
