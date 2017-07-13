import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { SelectComponent } from 'ng2-select';

import * as accountsReducer from '../../store/accounts.reducer';

import { AccountsService, AccountUpdateResult } from '../../services/accounts.service';
import { UsersService } from 'app/common/users';
import { UserTasksService, UserTask } from 'app/user-tasks';

import { Account, AccountStatus, AccountPersonOfInterest, AccountStates, AccountManager } from '../../models/accounts';
import { AddPersonOfInterestComponent } from './account-editor/add-person-of-interest';

import { TabDirective } from 'app/common/ui/directives/tab';

import { RouteTransitionAnimation, DoneLoadingTransitionAnimation } from 'app/common/ui/animations';
import { ViewState } from 'app/common/ui/views/view-state';
import { ComposerComponent } from './status-view/composer/composer.component';
import { Observable } from 'rxjs/Observable';
import { UiState } from 'app/common/interfaces';
import { User } from 'app/common/users/user';
import { SelectItem } from 'app/common/select/select-item';
import { AccountsEffects } from 'app/sales/accounts/store/accounts.effects';
import * as accountReducer from 'app/sales/accounts/store/accounts.reducer';

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
export class DetailsViewComponent implements OnInit, OnDestroy {
    @ViewChild('accountEditor') accountEditor: AddPersonOfInterestComponent;

    allUsers: Array<any> = this.usersService.getUsers();

    public usersSelectList: Array<SelectItem> = this.usersService.getUsersAsSelect();

    @Input() account: Account;
    userState: any;
    userTasks: UserTask[] = [];

    uiState: UiState = new UiState(true);

    private onAccountUpdateListener: Subscription;

    public isDraft = AccountStates.Draft;

    constructor(
        private activatedRouter: ActivatedRoute,
        private accountsStore: Store<accountReducer.State>,
        private usersService: UsersService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.usersService.getState().subscribe(state => this.userState = state);
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
        // this.accountsService.addStatus(this.account, logStatus).subscribe(result => {

        // });
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
        // if(user) {
        //     if(user.id) {
        //         this.accountsService.setManager(this.account, user.id).subscribe(result => {
        //             if(result.updated){
        //                 var _user = this.allUsers.find((value: User) => { return value.id == user.id });

        //                 if(_user) {
        //                     let accountManager = new AccountManager();

        //                     accountManager.active = true;
        //                     accountManager.user = _user;
        //                     accountManager.assigned = new Date();

        //                     this.account.manager = accountManager;
        //                 }
        //             }
        //         })
        //     }
        // }
    }

    getSortedAccountStatuses(statuses: Array<AccountStatus>) {
        return statuses.sort((a: AccountStatus, b: AccountStatus) => { return +(b.publicationDate > a.publicationDate) || +(b.publicationDate == a.publicationDate) - 1; })
    }

    getManagerSelectItem(): SelectItem[] {
        if(this.account && this.account.manager){
            return [new SelectItem(this.account.manager.user.id, this.account.manager.user.fullName)];
        }

        return null;
    }

    ngOnDestroy() {
        
    }
}
