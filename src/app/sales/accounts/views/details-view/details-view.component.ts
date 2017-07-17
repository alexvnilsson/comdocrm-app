import { Component, OnInit, OnDestroy, ViewChild, Input, EventEmitter, Output } from '@angular/core';
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
    @Input() account: Account;
    @Input() modalOpen$: string;

    @Output() onModalOpen: EventEmitter<string> = new EventEmitter();

    composeLogOpen$: EventEmitter<boolean> = new EventEmitter();

    userState: any;
    userTasks: UserTask[] = [];

    uiState: UiState = new UiState(true);

    @Output() onPersonOfInterestAdded: EventEmitter<{ account: Account, person: AccountPersonOfInterest }> = new EventEmitter();
    @Output() onPersonOfInterestDeleted: EventEmitter<{ account: Account, person: AccountPersonOfInterest }> = new EventEmitter();

    @Output() onUserTaskAdded: EventEmitter<{ account: Account, status: AccountStatus, userTask: UserTask }> = new EventEmitter();
    @Output() onUserTaskDeleted: EventEmitter<{ account: Account, status: AccountStatus, userTask: UserTask }> = new EventEmitter();

    private onAccountUpdateListener: Subscription;

    public isDraft = AccountStates.Draft;

    constructor(
        
    ) { }

    ngOnInit() {
        //this.usersService.getState().subscribe(state => this.userState = state);
    }

    onComposeLogMessageClick() {
        this.composeLogOpen$.emit(true);
    }

    onComposeLogMessageClosed() {
        this.composeLogOpen$.emit(false);
    }

    onLogComposerSubmit(logStatus: AccountStatus) {
        // this.accountsService.addStatus(this.account, logStatus).subscribe(result => {

        // });
    }

    onPersonDeleted(personOfInterest: AccountPersonOfInterest) {
        if(personOfInterest && this.account) {
            this.onPersonOfInterestDeleted.emit({
                account: this.account,
                person: personOfInterest
            });
        }
    }

    _onUserTaskDeleted(event: any) {
        console.log('onUserTaskDeleted', event);
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
