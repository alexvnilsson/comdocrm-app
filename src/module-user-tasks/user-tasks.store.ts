import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { UserTask } from './models/userTask';

@Injectable()
export class UserTasksStore implements IUserTasksStore {
    public OnUserTasksChanged: EventEmitter<Array<UserTask>> = new EventEmitter();
    public OnUserTaskAdded: EventEmitter<Array<UserTask>> = new EventEmitter();

    private _items: Array<UserTask> = [];

    public getAll(): Array<UserTask> {
        return this._items;
    }

    public add(item: UserTask): void {
        this._items.push(item);

        this.OnUserTasksChanged.next(this._items);
        this.OnUserTaskAdded.next([item]);
    }

    public addRange(items: Array<UserTask>): void {
        items.forEach((item: UserTask) => {
            this._items.push(item);
        });

        this.OnUserTasksChanged.next(this._items);
        this.OnUserTaskAdded.next(items);
    }
}

export interface IUserTasksStore {
    OnUserTasksChanged: EventEmitter<Array<UserTask>>;
    OnUserTaskAdded: Subject<Array<UserTask>>;

    getAll(): Array<UserTask>;

    add(item: UserTask): void;
    addRange(items: Array<UserTask>): void;

}