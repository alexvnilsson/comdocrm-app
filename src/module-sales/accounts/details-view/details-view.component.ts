import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AccountsService, AccountUpdateResult } from '../accounts.service';
import { UsersService } from 'common/users';
import { UserTasksService, UserTask } from 'module-user-tasks';

import { Account, AccountStatus, AccountPersonOfInterest } from '../../models/account';
import { AddPersonOfInterestComponent } from './account-editor/add-person-of-interest';

import { TabDirective } from 'common/ui/directives/tab';

import { RouteTransitionAnimation, DoneLoadingTransitionAnimation } from 'common/ui/animations';
import { ViewState } from '../../../common/ui/views/view-state';
import { ComposerComponent } from './status-view/composer/composer.component';
import { Observable } from 'rxjs/Observable';
import { UiState } from 'common/interfaces';
import { UiStateComponentObject } from '../../../common/interfaces/ui-state.interface';

@Component({
    selector: 'ccrm-sales-accounts-details-view',
    templateUrl: './details-view.component.html',
    styleUrls: ['./details-view.component.scss'],
    animations: [
        RouteTransitionAnimation,
        DoneLoadingTransitionAnimation
    ],
    host: {
        '[@routeTransition]': ''
    }
})
export class DetailsViewComponent implements OnInit, UiState, OnDestroy {
    @ViewChild('accountEditor') accountEditor: AddPersonOfInterestComponent;

    account: Account;
    userState: any;
    userTasks: UserTask[] = [];

    uiState: UiStateComponentObject = new UiStateComponentObject(true);

    private onAccountUpdateListener: Subscription;

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
                this.accountsService.getByNameIdentity(accountSlug).subscribe(this.onAccountLoad.bind(this), error => this.uiState.onError(error));
        });

        this.onAccountUpdateListener = this.accountsService.onAccountUpdate.subscribe(this.onAccountUpdate.bind(this));
    }

    uiOnComplete() {
        this.uiState.isComplete = true;
    }

    uiOnError() {

    }

    onComposerSelected(composer: string) {
        this.router.navigate([{ outlets: { 'compose': [ 'log' ] } }], { relativeTo: this.route });

        return false;
    }

    onLogComposerSubmit(logStatus: AccountStatus) {
        this.accountsService.addStatus(this.account, logStatus).subscribe(result => {

        });
    }

    onAccountLoad(account: Account) {
        this.account = account;

        this.uiOnComplete();
    }

    onAccountLoadError(error: any) {
        
    }

    onAccountUpdate(account: Account) {
        this.account = account;
    }

    onPersonDeleted(personOfInterest: AccountPersonOfInterest) {
        if(personOfInterest && this.account) {
            this.account.peopleOfInterest = this.account.peopleOfInterest.filter((person: AccountPersonOfInterest) => {
                return person.id !== personOfInterest.id
            });
        }
    }

    clickAddPersonOfInterest() {
        this.router.navigate([{ outlets: { 'modal': [ 'contacts-add' ] } }], { relativeTo: this.route });
    }

    getSortedAccountStatuses(statuses: Array<AccountStatus>) {
        return statuses.sort((a: AccountStatus, b: AccountStatus) => { return +(b.publicationDate > a.publicationDate) || +(b.publicationDate == a.publicationDate) - 1; })
    }

    ngOnDestroy() {
        this.onAccountUpdateListener.unsubscribe();
    }
}
