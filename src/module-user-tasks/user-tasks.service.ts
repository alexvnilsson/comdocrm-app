import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthHttpExtended } from 'common/authentication';

import { UserTasksStore } from './user-tasks.store';
import { UserTask } from './models/userTask';

@Injectable()
export class UserTasksService {
    private baseAddr: string = '/api/user_tasks';

    constructor(
        private store: UserTasksStore,
        private http: AuthHttpExtended
    ) {

    }

    addOne(userTask: UserTask) {
        let newUserTask: UserTask = JSON.parse(JSON.stringify(userTask));

        this.http.post(`${this.baseAddr}/create`, newUserTask).subscribe(result => {
            this.store.add(newUserTask);
        });
    }

    getAll(): Observable<Array<UserTask>> {
        return new Observable(observer => {
            this.http.get(`${this.baseAddr}/test/test`).subscribe(res => {
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