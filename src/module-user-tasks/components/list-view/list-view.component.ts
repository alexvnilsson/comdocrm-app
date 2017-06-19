import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserTasksService } from '../../user-tasks.service';
import { UserTask } from '../../user-task';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'ccrm-user-tasks-list-view',
    templateUrl: './list-view.component.html',
    styles: [
        ``
    ]
})
export class ListViewComponent implements OnInit, OnDestroy {
    @Input('container') containerName: string;
    @Input('containerId') containerId: string;

    items: Array<UserTask> = [];

    private userTaskListener: Subscription;

    constructor(
        private userTasks: UserTasksService
    ) {}

    ngOnInit() {
        this.userTasks.getAll(this.containerName, this.containerId).subscribe(tasks => {
            this.items = tasks;
        });

        this.userTaskListener = this.userTasks.addEventListener('userTasksChanged').subscribe((items: UserTask[]) => {
            this.items = items;
        });
    }

    ngOnDestroy() {
        this.userTaskListener.unsubscribe();
    }
}
