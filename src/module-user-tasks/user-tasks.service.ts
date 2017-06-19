import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthHttpExtended } from 'common/authentication';

import { UserTasksStore } from './user-tasks.store';
import { UserTask, UserTaskContainer, UserTaskType } from './user-task';
import { UserTaskException } from './user-task/user-task-exception';
import { AccountStatus } from '../module-sales/models/account';

@Injectable()
export class UserTasksService {
    private baseAddr: string = '/api/users/tasks';

    private OnUserTaskAdded: EventEmitter<UserTask> = new EventEmitter();

    constructor(
        private store: UserTasksStore,
        private http: AuthHttpExtended
    ) {

    }

    onUserTaskAdded(status: AccountStatus): Observable<UserTask> {
        return new Observable(observer => {
            this.OnUserTaskAdded.subscribe((userTask: UserTask) => {
                if(userTask.container) {
                    if(userTask.container.id === status.id) {
                        observer.next(userTask);
                    }
                }
            });
        });
    }

    addOne(userTask: UserTask): Observable<Response> {
        return new Observable(observer => {
            if(!userTask.container)
                observer.error(new UserTaskException({
                    Message: 'UserTask requires Container.',
                    NoContainer: true
                }));

            if(!userTask.type)
                observer.error(new UserTaskException({
                    Message: 'UserTask requires Type.',
                    NoType: true
                }));

            let newUserTask: UserTask = JSON.parse(JSON.stringify(userTask));

            this.http.post(`${this.baseAddr}/add`, newUserTask).subscribe(result => {
                if(result.ok) {
                    this.OnUserTaskAdded.next(newUserTask);

                    this.store.add(newUserTask);

                    observer.next(result);
                }
            });
        });
    }

    getAll(container: string, id: string): Observable<Array<UserTask>> {
        return new Observable(observer => {
            this.http.get(`${this.baseAddr}/${container}/${id}`).subscribe(res => {
                let jsonResult = res.json() || null;

                if(jsonResult)
                    observer.next(jsonResult);
            });
        });
    }

    addEventListener(event: string): Observable<any> {
        switch(event) {
            case 'userTasksChanged': return this.store.OnUserTasksChanged;
            case 'userTaskAdded': return this.store.OnUserTaskAdded;

            default: throw `Event by identifier "${event}" could not be resolved.`;
        }
    }

    getStore(): UserTasksStore {
        return this.store;
    }
}

export interface UserTasksService {
    addEventListener(event: 'userTasksChanged'): Observable<any>;
    addEventListener(event: 'userTaskAdded'): Observable<any>;
}