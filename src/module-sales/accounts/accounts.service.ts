import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthHttpExtended } from 'common/authentication';
import { Observable } from 'rxjs/Observable';

import { UsersService } from 'common/users';

import { Account, AccountStatus, AccountStatusMetadata, AccountPersonOfInterest } from '../models/account';
import { UserTask } from 'module-user-tasks/user-task';
import { UserTaskException } from '../../module-user-tasks/user-task/user-task-exception';

export interface AccountUpdateResult {
    updated: boolean;
}

export class StatusUserTaskAddedEvent {
    constructor(
        public status: AccountStatus,
        public userTask: UserTask
    ) {}
}

@Injectable()
export class AccountsService {
    private baseAddr: string = "/api/sales";

    public onAccountUpdate: EventEmitter<Account> = new EventEmitter();
    public onUserTaskAddedToStatus: EventEmitter<StatusUserTaskAddedEvent> = new EventEmitter();

    _userState: any = null;
    _accountList: Array<Account> = null;

    constructor(
        private http: AuthHttpExtended,
        private usersService: UsersService
    ) { }

    getUserState(): Observable<any> {
        return new Observable(observer => {
            this.usersService.getState().subscribe(state => {
                observer.next(state);
            }, (error: any) => {
                console.error(error);
            });
        });
    }

    getAll(): Observable<Array<Account>> {
        return new Observable(observer => {
            this.http.get(`${this.baseAddr}/accounts`).subscribe(
                (res: Response) => {
                    let jsonResult = res.json() || null;

                    if(jsonResult) {
                        observer.next(jsonResult);
                    }
                },
                (error: any) => {
                    observer.error(error); });
        });
    }

    getByAny(accountQuery: string): Observable<Account> {
        return new Observable(observer => {
            this.http.get(`${this.baseAddr}/accounts/${accountQuery}`)
                .subscribe((res: Response) => {
                    let jsonResult = res.json() || null;

                    if(jsonResult) {
                        observer.next(jsonResult);
                    }
                }, (error: any) => { observer.error(error); });
        });
    }

    getById(account: string): Observable<Account> {
        return this.getByAny(account);
    }

    getBySlug(account: string): Observable<Account> {
        return this.getByAny(account);
    }

    getByStatus(statusId: string): Observable<Account> {
        return new Observable(observer => {
            this.http.get(`${this.baseAddr}/accounts/statuses/${statusId}`).subscribe((res: Response) => {
                let resultData: Account = res.json() || null;

                if(resultData) {
                    observer.next(resultData);
                }
            })
        });
    }

    addStatus(account: Account, status: AccountStatus): Observable<AccountUpdateResult> {
        return new Observable(observer => {
            status.accountId = account.id;
            status.publicationDate = new Date();

            this.http.post(`${this.baseAddr}/accounts/statuses/add`, status).subscribe((res: Response) => {
                let resultData: AccountUpdateResult = res.json() || null;

                if(resultData) {
                    if(resultData.updated) {
                        let rawStatus = JSON.stringify(status);
                        let _status: AccountStatus = JSON.parse(rawStatus);

                        account.statuses.unshift(_status);
                    }

                    observer.next(resultData);
                }
                else {
                    observer.error();
                }
            });
        });
    }

    addPersonOfInterest(account: Account, personOfInterest: AccountPersonOfInterest): Observable<AccountUpdateResult> {
        return new Observable(observer => {
            console.log(account, personOfInterest);
            personOfInterest.accountId = account.id;

            this.http.post(`${this.baseAddr}/accounts/contacts/add`, personOfInterest).subscribe(result => {
                if(result.ok)
                    observer.next();
                else
                    observer.error();
            });
        });
    }

    updatePersonOfInterest(personOfInterest: AccountPersonOfInterest): Observable<AccountUpdateResult> {
        return new Observable(observer => {
            this.http.post(`${this.baseAddr}/accounts/contacts/update`, personOfInterest).subscribe(result => {
                if(result.ok)
                    observer.next();
                else
                    observer.error();
            });
        });
    }

    addUserTask(status: AccountStatus, _userTask: UserTask): Observable<AccountUpdateResult> {
        return new Observable(observer => {
            let userTask: UserTask = JSON.parse(JSON.stringify(_userTask));
            userTask.ownerId = status.id;

            console.log(userTask);

            this.http.post(`${this.baseAddr}/accounts/statuses/usertasks/add`, userTask).subscribe(result => {
                if(result.ok){
                    status.userTasks.push(userTask);

                    this.onUserTaskAddedToStatus.next(new StatusUserTaskAddedEvent(status, userTask));
                    observer.next({ updated: true });
                }
                else
                    observer.error();
            })
        })
    }

    saveChanges(account: Account, callback: (result: AccountUpdateResult) => any): Observable<Account> {
        return new Observable(observer => {
            this.http.post(`${this.baseAddr}/accounts/save/${account.id}`, account).subscribe((res: Response) => {
                let resultData: AccountUpdateResult = res.json() || null;

                if (resultData) {
                    this.onAccountUpdate.next(account);
                }

                observer.next(resultData);
            });
        })
    }
}
