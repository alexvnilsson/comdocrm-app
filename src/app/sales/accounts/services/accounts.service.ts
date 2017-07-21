import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthHttpExtended } from 'app/common/authentication';
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
export class AccountsService {
    private baseAddr: string = "/api/sales";

    accounts$: Observable<Account[]>;

    public onAccountUpdate: EventEmitter<Account> = new EventEmitter();
    public onUserTaskAddedToStatus: EventEmitter<StatusUserTaskAddedEvent> = new EventEmitter();

    _userState: any = null;

    constructor(
        private http: AuthHttpExtended,
        private router: Router,
        private usersService: UsersService
    ) { }

    navigateTo(account: Account, alias?: string) {
        var query = null;

        if(account && account.alias){
            query = account.alias;
        }
        else if (alias) {
            query = alias;
        }
        else
            throw 'No queryable parameters passed.';

        if(query) {
            this.router.navigate([ 'sales/accounts', query ])
            .catch(error => {
                console.log(error);
            })
            .then();
        }
    }

    add(account: Account): Observable<Account> {
        return new Observable(observer => {
            this.http.post(`${this.baseAddr}/accounts`, account)
            .map(res => res.json() as Account || null)
            .subscribe(account => {
                if(account.id) {
                    observer.next(account);
                }
            })
        });
    }

    getAll(): Observable<Array<Account>> {
        return this.http.get(`${this.baseAddr}/accounts`)
                .map(res => res.json() as Account[] || null);
    }

    getByAny(accountQuery: string, open?: boolean): Observable<Account> {
        return new Observable(observer => {
            this.http.get(`${this.baseAddr}/accounts/${accountQuery}`)
            .map(res => res.json() as Account || null)
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

    import(account: Account): Observable<AccountUpdateResult> {
        return new Observable(observer => {
            this.http.post(`${this.baseAddr}/accounts/import/lead`, account)
            .map(res => res.json() as AccountUpdateResult || null)
            .subscribe(result => {
                observer.next(result);
            })
        })
    }

    addStatus(account: Account, status: AccountStatus): Observable<AccountUpdateResult> {
        return new Observable(observer => {
            this.http.post(`${this.baseAddr}/accounts/${account.alias}/statuses`, status).subscribe((res: Response) => {
                let resultData: AccountUpdateResult = res.json() || null;

                if(resultData) {
                    observer.next(resultData);
                }
                else {
                    observer.error();
                }
            });
        });
    }

    deleteStatus(account: Account, status: AccountStatus): Observable<AccountUpdateResult> {
        return new Observable(observer => {
            if(!status.isRemoved) {
                this.http.delete(`${this.baseAddr}/accounts/${account.alias}/statuses/${status.id}`).subscribe(result => {
                    if(result.ok) {
                        observer.next({
                            updated: true
                        });
                    }
                },
                error => observer.error(error));
            }
        })
    }

    addPersonOfInterest(account: Account, personOfInterest: AccountPersonOfInterest): Observable<AccountUpdateResult> {
        return new Observable(observer => {
            this.http.post(`${this.baseAddr}/accounts/${account.alias}/contacts`, personOfInterest)
            .map(res => res.json() as AccountUpdateResult || null)
            .subscribe(result => {
                if(result) {
                    observer.next(result);
                }
                else
                    observer.error();
            });
        });
    }

    updatePersonOfInterest(account: Account, personOfInterest: AccountPersonOfInterest): Observable<AccountUpdateResult> {
        return new Observable(observer => {
            this.http.put(`${this.baseAddr}/accounts/${account.alias}/contacts/${personOfInterest.id}`, personOfInterest).subscribe(result => {
                if(result.ok)
                    observer.next();
                else
                    observer.error();
            });
        });
    }

    deletePersonOfInterest(account: Account, personOfInterest: AccountPersonOfInterest): Observable<AccountUpdateResult> {
        return new Observable(observer => {
            this.http.delete(`${this.baseAddr}/accounts/${account.alias}/contacts/${personOfInterest.id}`).subscribe(res => {
                if(res && res.ok) {
                    observer.next();
                }
            });
        });
    }

    addUserTask(account: Account, status: AccountStatus, userTask: UserTask): Observable<AccountUpdateResult> {
        return new Observable(observer => {
            this.http.post(`${this.baseAddr}/accounts/${account.alias}/statuses/${status.id}/tasks`, userTask)
            .map(res => res.json() as AccountUpdateResult || null)
            .subscribe(result => {
                if(result && result.updated){
                    observer.next(result);
                }
                else
                    observer.error();
            })
        })
    }

    deleteUserTask(account: Account, status: AccountStatus, userTask: UserTask): Observable<AccountUpdateResult> {
        return new Observable(observer => {
            this.http.delete(`${this.baseAddr}/accounts/${account.alias}/statuses/${status.id}/tasks/${userTask.id}`)
            .map(res => res.json() as AccountUpdateResult || null)
            .subscribe(result => {
                observer.next(result);
            });
        });
    }

    setManager(account: Account, userId: string): Observable<AccountUpdateResult> {
        return new Observable(observer => {
            this.http.put(`${this.baseAddr}/accounts/${account.alias}/manager`, {
                Id: userId
            }).subscribe(res => {
                if(res.ok) {
                    observer.next({
                        updated: true
                    });
                }
                else {
                    observer.error();
                }
            },
            error => observer.error(error))
        });
    }

    saveCustomer(account: Account): Observable<AccountUpdateResult> {
        return new Observable(observer => {
            this.http.put(`${this.baseAddr}/accounts/${account.id}/customer`, account.customer)
            .map(res => res.json() as AccountUpdateResult || null)
            .subscribe(result => {
                if (result) {
                    this.onAccountUpdate.next(account);
                }

                observer.next(result);
            });
        });
    }

    saveChanges(account: Account): Observable<AccountUpdateResult> {
        return new Observable(observer => {
            this.http.put(`${this.baseAddr}/accounts/${account.id}`, account)
            .map(res => res.json() as AccountUpdateResult || null)
            .subscribe(result => {
                if (result) {
                    this.onAccountUpdate.next(account);
                }

                observer.next(result);
            });
        });
    }
}
