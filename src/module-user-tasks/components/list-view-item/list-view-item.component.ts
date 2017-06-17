import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserTasksService } from '../../user-tasks.service';
import { UserTask } from '../../models/userTask';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'ccrm-user-tasks-list-view-item',
    templateUrl: './list-view-item.component.html',
    styles: [
        ``
    ]
})
export class ListViewItemComponent implements OnInit, OnDestroy {
    @Input('task') item: UserTask;

    

    constructor(
        private userTasks: UserTasksService
    ) {}

    ngOnInit() {
        
    }

    ngOnDestroy() {
        
    }
}
