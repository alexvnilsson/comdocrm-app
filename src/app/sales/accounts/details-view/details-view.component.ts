import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SelectComponent } from 'ng2-select';

import { AccountsService, AccountUpdateResult } from '../accounts.service';
import { UsersService } from 'app/common/users';
import { UserTasksService, UserTask } from 'app/user-tasks';

import { Account, AccountStatus, AccountPersonOfInterest, AccountStates } from '../accounts';
import { AddPersonOfInterestComponent } from './account-editor/add-person-of-interest';

import { TabDirective } from 'app/common/ui/directives/tab';

import { RouteTransitionAnimation, DoneLoadingTransitionAnimation } from 'app/common/ui/animations';
import { ViewState } from '../../../common/ui/views/view-state';
import { ComposerComponent } from './status-view/composer/composer.component';
import { Observable } from 'rxjs/Observable';
import { UiState } from 'app/common/interfaces';
import { UiStateComponentObject } from '../../../common/interfaces/ui-state.interface';
import { User } from '../../../common/users/user';
import { SelectItem } from '../../../common/select/select-item';

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

    allUsers: Array<any> = this.usersService.getUsers();

    public usersSelectList: Array<SelectItem> = this.usersService.getUsersAsSelect();

    account: Account;
    userState: any;
    userTasks: UserTask[] = [];

    uiState: UiStateComponentObject = new UiStateComponentObject(true);

    private onAccountUpdateListener: Subscription;

    public isDraft = AccountStates.Draft;

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
            let accountAlias = params.slug;

            if(accountAlias)
                this.accountsService.getByAlias(accountAlias).subscribe(this.onAccountLoad.bind(this), error => this.uiState.onError(error));
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

    onPersonDeleted(personOfInterest: AccountPersonOfInterest, event: Event) {
        if(personOfInterest && this.account) {
            this.account.peopleOfInterest = this.account.peopleOfInterest.filter((person: AccountPersonOfInterest) => {
                return person.id !== personOfInterest.id
            });
        }
    }

    clickAddPersonOfInterest() {
        this.router.navigate([{ outlets: { 'contacts': [ 'add' ] } }], { relativeTo: this.route });
    }

    onSelectManager(user: SelectItem) {
        if(user) {
            if(user.id) {
                this.accountsService.setManager(this.account, user.id).subscribe(result => {
                    if(result.updated){
                        var _user = this.allUsers.find((value: User) => { return value.id == user.id });

                        if(_user)
                            this.account.manager.user = _user;
                    }
                })
            }
        }
    }

    getSortedAccountStatuses(statuses: Array<AccountStatus>) {
        return statuses.sort((a: AccountStatus, b: AccountStatus) => { return +(b.publicationDate > a.publicationDate) || +(b.publicationDate == a.publicationDate) - 1; })
    }

    getManagerSelectItem(): SelectItem[] {
        if(this.account && this.account.manager && this.account.manager.user)
            return [ new SelectItem(this.account.manager.user.id, this.account.manager.user.fullName) ];

        return null;
    }

    ngOnDestroy() {
        this.onAccountUpdateListener.unsubscribe();
    }
}
