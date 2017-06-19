import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
import { AccountStatus } from '../../../../../models/account';
import { UserTask, UserTaskContainer, UserTaskType } from 'module-user-tasks/user-task';
import { FormState } from '../../../../../../common/ui/forms/form-state';
import { AccountsService } from '../../../../accounts.service';
import { UserTasksService } from 'module-user-tasks';
import { NgForm } from '@angular/forms';
import { DatepickerDirective } from '../../../../../../common/ui/components/datepicker/datepicker.directive';

@Component({
    selector: 'ccrm-sales-accounts-status-add-reminder-inline',
    template: `
    <form #userTaskForm="ngForm" (ngSubmit)="saveUserTask(userTaskForm)">                    
        <ng-container *ngIf="editorState.isEditing">
            <div [@editorTransition]="editorState.isEditing" class="row mt-3 d-flex flex-row align-items-center">
                <div class="col-3">
                    <div ccrmUiDatepicker [(ngModel)]="userTask.reminderDate" required name="reminderDate" class="input-group date">
                        <span class="input-group-addon"><fa name="calendar"></fa></span>
                        <input
                            #dateInput
                            (focus)="onInputFocused()"
                            (blur)="onInputBlurred()"
                            autofocus
                            type="text"
                            class="form-control">
                    </div>
                </div>

                <div class="col-9">
                    <input
                        #displayNameInput
                        (focus)="onInputFocused()"
                        (blur)="onInputBlurred()"
                        required
                        [(ngModel)]="userTask.displayName"
                        name="displayName"
                        autocomplete="off"
                        class="form-control"
                        placeholder="Summary" />
                </div>

                <div class="col">
                    <button
                        type="submit" 
                        class="btn btn-primary btn-sm d-none"
                        role="button">Save</button>
                </div>
            </div>  
        </ng-container>

        <ng-container *ngIf="!editorState.isEditing">
            <div [@editorTransition]="editorState.isEditing" class="row mt-3 d-flex flex-row align-items-center">
                <span 
                    (click)="onAddUserTask()"
                    (focus)="onInputFocused()"
                    (blur)="onInputBlurred()"
                    role="button" 
                    tooltip="New reminder"
                    i18n-tooltip
                    placement="top" 
                    container="body">
                    + <fa name="calendar"></fa>
                </span>
            </div>
        </ng-container>
    </form>
    `,
    animations: [
        trigger('editorTransition', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate('200ms 100ms', keyframes([
                    style({ opacity: 0, offset: 0 }),
                    style({ opacity: 0, offset: 0.5 }),
                    style({ opacity: 1, offset: 1 })
                ]))
            ]),
            transition('* => void', [
                animate('100ms', keyframes([
                    style({ opacity: 1, offset: 0 }),
                    style({ opacity: 0, offset: 1 })
                ]))
            ])
        ])
    ]
})
export class AddReminderInlineComponent implements OnInit {
    @ViewChild('dateInput') dateInput: ElementRef;
    @ViewChild('displayNameInput') displayNameInput: ElementRef;

    @Input() status: AccountStatus;

    userTask: UserTask = {
        container: {
            name: 'AccountStatus',
            id: null
        },
        type: {
            name: 'UserReminders'
        },
        displayName: null,
        summaryText: null,
        hasReminder: true,
    }

    editorState = {
        isEditing: false,
        isWaitingExit: false
    };

    constructor(
        private accountsService: AccountsService,
        private userTasksService: UserTasksService
    ) {}

    ngOnInit() {
        this.userTask.container.id = this.status.id;
    }

    onEditorEnabled() {
        this.editorState.isEditing = true;

        setTimeout(() => {
            this.dateInput.nativeElement.focus();
        }, 100);
    }

    onEditorDisabled() {
        this.editorState.isEditing = false;
    }

    onInputFocused() {
        this.editorState.isWaitingExit = false;
    }

    onInputBlurred() {
        this.editorState.isWaitingExit = true;

        setTimeout(() => {
            if(this.editorState.isWaitingExit)
                this.onEditorDisabled();
        }, 1000);
    }

    onAddUserTask() {
        this.onEditorEnabled();
    }

    saveUserTask(form: NgForm) {
        if(!form.invalid) {
            this.userTasksService.addOne(this.userTask).subscribe(result => {
                if(result.ok) {
                    form.reset();
                    this.editorState.isEditing = false;
                }
            });
        }
    }
}