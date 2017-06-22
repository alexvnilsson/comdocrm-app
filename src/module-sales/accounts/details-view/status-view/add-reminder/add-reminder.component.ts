import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormState } from '../../../../../common/ui/views/form-state';
import { ModalDirective } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountsService } from '../../../accounts.service';
import { Account, AccountStatus } from '../../../../models/account';
import { UserTasksService, UserTask } from 'module-user-tasks';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'ccrm-sales-accounts-status-add-reminder',
    templateUrl: './add-reminder.component.html'
})
export class AddReminderComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('addReminderModal') modal: ModalDirective;

    formState: FormState = new FormState({
        isLoading: false
    });

    formStateExtra = {
        hasDetails: true
    };

    statusId: string = null;
    account: Account = null;
    status: AccountStatus = null;

    userTask: UserTask = {
        displayName: null,
        summaryText: null,
        hasReminder: true
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private accountsService: AccountsService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            if(params.id) {
                this.statusId = params.id;

                this.accountsService.getByStatus(this.statusId).subscribe(this.onAccountLoad.bind(this));
            }

            if(params.details) {
                if(params.details === 'no-details')
                    this.formStateExtra.hasDetails = false;
            }
        });
    }

    onAccountLoad(account: Account) {
        this.account = account;

        if(this.account.statuses && this.account.statuses.length > 0) {
            let status: AccountStatus = this.account.statuses.find(status => status.id === this.statusId);

            if(status) {
                this.status = status;
            }
        }
    }

    ngAfterViewInit() {
        this.modal.show();

        this.modal.onHide.subscribe(hidden => {
            this.router.navigate(['.', { outlets: { modal: null } }], { relativeTo: this.route.parent } );
        });
    }

    saveReminder(form: NgForm) {
        if(form.invalid)
            return;

        this.accountsService.addUserTask(this.status, this.userTask).subscribe(result => {
            if(result.updated) {
                this.hideModal();
            }
        });
    }

    hideModal() {
        this.modal.hide();
    }

    ngOnDestroy() {

    }
}
