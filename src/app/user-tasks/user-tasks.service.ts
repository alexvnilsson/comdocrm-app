import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UserTask } from './user-task';
import { UserTaskException } from './user-task/user-task-exception';

@Injectable()
export class UserTasksService {
    private baseAddr: string = '/api/users/tasks';

    private OnUserTaskAdded: EventEmitter<UserTask> = new EventEmitter();

    constructor(
        private http: HttpClient
    ) {

    }

    
}