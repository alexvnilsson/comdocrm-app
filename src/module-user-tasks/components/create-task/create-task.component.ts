import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';

import { UserTasksService } from '../../user-tasks.service';
import { UserTask } from '../../user-task';

@Component({
    selector: 'ccrm-user-tasks-create-task',
    templateUrl: './create-task.component.html',
    animations: [
        trigger('editorTransition', [
            transition('void => *', [
                animate(500, keyframes([
                    style({ opacity: 0, transform: 'translateY(-100%)', height: 0, offset: 0 }),
                    style({ opacity: 0, transform: 'translateY(-20%)', height: 'auto', offset: 0.33 }),
                    style({ opacity: 1, transform: 'translateY(0%)', offset: 1 })
                ]))
            ]),
            transition('* => void', [
                animate(500, keyframes([
                    style({ opacity: 1, transform: 'translateY(0%)', offset: 0 }),
                    style({ opacity: 0, transform: 'translateY(-20%)', offset: 0.33 }),
                    style({ opacity: 0, transform: 'translateY(-100%)', height: 0, offset: 1 })
                ]))
            ])
        ]),
    ]
})
export class CreateTaskComponent implements OnInit, OnDestroy {
    task: UserTask = {
        container: {
            name: 'test'
        },
        type: {
            name: 'UserReminders'
        },
        displayName: null,
        summaryText: null,
        hasReminder: false
    };

    state = {
        isEditing: false
    };

    constructor(
        private userTasksService: UserTasksService
    ) {}

    ngOnInit() {

    }

    onFormSubmit(form: NgForm) {
        this.userTasksService.addOne(this.task);

        form.resetForm();

        this.state.isEditing = false;
    }

    onEditorFocus() {
        this.state.isEditing = true;
    }

    ngOnDestroy() {
        
    }

    
}
