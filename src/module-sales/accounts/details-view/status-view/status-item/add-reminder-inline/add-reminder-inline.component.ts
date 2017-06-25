import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
import { AccountStatus } from '../../../../../models/account';
import { UserTask } from 'module-user-tasks/user-task';
import { FormState } from '../../../../../../common/ui/views/form-state';
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
                <div class="col-md-1">
                    <a
                        ccrmUiDatepicker
                        autoOpen="true"
                        keepOpen="true"
                        orientation="top"
                        (focus)="onInputFocused()"
                        (blur)="onInputBlurred()"
                        href="#"
                        [(ngModel)]="userTask.reminderDate"
                        required
                        name="reminderDate"
                        class="pt-2 pb-2 no-underline color-black">
                        <fa name="calendar"></fa>
                    </a>
                </div>

                <div class="col-md hidden-lg-up mt-2"></div>

                <div class="col-md-11">
                    <input
                        (focus)="onInputFocused()"
                        (blur)="onInputBlurred()"
                        [(ngModel)]="userTask.displayName"
                        required
                        name="displayName"
                        autocomplete="off"
                        class="form-control should-validate"
                        placeholder="Summarize the reminder" />
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
            <div class="row mt-3 pl-2 pr-2">
                <span [@editorTransition]="editorState.isEditing"
                    (click)="onAddUserTask()"
                    role="button" 
                    tooltip="New reminder"
                    i18n-tooltip
                    placement="right" 
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
    @Input() status: AccountStatus;

    private waitBlurTimer = null;

    userTask: UserTask = {
        displayName: null,
        summaryText: null,
        hasReminder: true,
    }

    editorState = {
        isEditing: false,
        isWaitingExit: false
    };

    constructor(
        private accountsService: AccountsService
    ) {}

    ngOnInit() {
        
    }

    onEditorEnabled() {
        this.editorState.isEditing = true;
    }

    onEditorDisabled() {
        this.editorState.isEditing = false;
    }

    onInputFocused() {
        this.editorState.isWaitingExit = false;

        if(this.waitBlurTimer)
            clearTimeout(this.waitBlurTimer);
    }

    onInputBlurred() {
        this.editorState.isWaitingExit = true;

        if(this.waitBlurTimer)
            clearTimeout(this.waitBlurTimer);

        this.waitBlurTimer = setTimeout(() => {
            if(this.editorState.isWaitingExit)
                this.onEditorDisabled();
        }, 10000);
    }

    onAddUserTask() {
        this.onEditorEnabled();
    }

    saveUserTask(form: NgForm) {
        if(!form.invalid) {
            this.accountsService.addUserTask(this.status, this.userTask).subscribe(result => {
                if(result.updated) {
                    form.reset();
                    this.editorState.isEditing = false;
                }
            });
        }
    }
}