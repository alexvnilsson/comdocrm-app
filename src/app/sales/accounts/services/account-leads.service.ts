import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UsersService } from 'app/common/users';

import { Account, AccountStatus, AccountStatusMetadata, AccountPersonOfInterest, AccountSource, AccountStates } from '../models/accounts';
import { UserTask } from 'app/user-tasks/user-task';
import { UserTaskException } from 'app/user-tasks/user-task/user-task-exception';
import { Router } from '@angular/router';

export interface AccountUpdateResult {
    updated: boolean;

    id?: string;
    alias?: string;
}

export class StatusUserTaskAddedEvent {
    constructor(
        public status: AccountStatus,
        public userTask: UserTask
    ) {}
}

@Injectable()
export class AccountLeadsService {
    accounts$: Observable<Account[]>;

    public onAccountUpdate: EventEmitter<Account> = new EventEmitter();
    public onUserTaskAddedToStatus: EventEmitter<StatusUserTaskAddedEvent> = new EventEmitter();

    _userState: any = null;

    constructor(
        private http: HttpClient,
        private router: Router,
        private usersService: UsersService
    ) { }

    getAll(): Observable<Array<Account>> {
        return this.http.get('/api/sales/leads')
          .map(res => res as Account[] || null);
    }

    getByAny(accountQuery: string, open?: boolean): Observable<Account> {
        return new Observable(observer => {
            this.http.get(`/api/sales/leads/${accountQuery}`)
            .map(res => res as Account || null)
            .subscribe(account => {
                if(account) {
                    observer.next(account);
                }
            }, (error: any) => { observer.error(error); });
        });
    }

    getById(account: string): Observable<Account> {
        return this.getByAny(account);
    }

    getByAlias(alias: string): Observable<Account> {
        return this.getByAny(alias);
    }
}
