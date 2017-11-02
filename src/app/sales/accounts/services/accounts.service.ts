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
  ) { }
}

@Injectable()
export class AccountsService {
  accounts$: Observable<Account[]>;

  public onAccountUpdate: EventEmitter<Account> = new EventEmitter();
  public onUserTaskAddedToStatus: EventEmitter<StatusUserTaskAddedEvent> = new EventEmitter();

  _userState: any = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private usersService: UsersService
  ) { }

  navigateTo(account: Account, alias?: string) {
    var query = null;

    if (account && account.alias) {
      query = account.alias;
    }
    else if (alias) {
      query = alias;
    }
    else
      throw 'No queryable parameters passed.';

    if (query) {
      this.router.navigate(['sales/accounts', query])
        .catch(error => {
          console.log(error);
        })
        .then();
    }
  }

  add(account: Account): Observable<Account> {
    return new Observable(observer => {
      this.http.post('/api/sales/accounts', account)
        .map(res => res as Account || null)
        .subscribe(account => {
          if (account.id) {
            observer.next(account);
          }
        })
    });
  }

  getAll(): Observable<Array<Account>> {
    return this.http.get('/api/sales/accounts')
      .map(res => res as Account[] || null);
  }

  getByAny(accountQuery: string, open?: boolean): Observable<Account> {
    return new Observable(observer => {
      this.http.get(`/api/sales/accounts/${accountQuery}`)
        .map(res => res as Account || null)
        .subscribe(account => {
          if (account) {
            observer.next(account);
          }
        }, (error: any) => observer.error(error));
    });
  }

  getById(account: string): Observable<Account> {
    return this.getByAny(account);
  }

  getByAlias(alias: string): Observable<Account> {
    return this.getByAny(alias);
  }

  getStatuses(alias: string): Observable<Array<AccountStatus>> {
    return new Observable(observer => {
      this.http.get(`/api/sales/accounts/${alias}/statuses`)
        .map(res => res as Array<AccountStatus> || null)
        .subscribe(people => {
          if (people && people.length > 0) {
            observer.next(people);
          }
        }, (error: any) => observer.error(error));
    });
  }

  getByStatus(statusId: string): Observable<Account> {
    return new Observable(observer => {
      this.http.get(`/api/sales/accounts/statuses/${statusId}`)
        .map(res => res as Account || null)
        .subscribe(res => {
          if (res) {
            observer.next(res);
          }
        })
    });
  }

  import(account: Account): Observable<AccountUpdateResult> {
    return new Observable(observer => {
      this.http.post(`/api/sales/accounts/import/lead`, account)
        .map(res => res as AccountUpdateResult || null)
        .subscribe(result => {
          observer.next(result);
        })
    })
  }

  addStatus(account: Account, status: AccountStatus): Observable<AccountUpdateResult> {
    return new Observable(observer => {
      this.http.post(`/api/sales/accounts/${account.alias}/statuses`, status)
      .map(res => res as AccountUpdateResult || null)
      .subscribe(res => {
        if (res) {
          observer.next(res);
        }
        else {
          observer.error();
        }
      });
    });
  }

  deleteStatus(account: Account, status: AccountStatus): Observable<AccountUpdateResult> {
    return new Observable(observer => {
      if (!status.isRemoved) {
        this.http.delete(`/api/sales/accounts/${account.alias}/statuses/${status.id}`)
        .subscribe(result => {
          observer.next({
            updated: true
          });
        },
          error => observer.error(error));
      }
    })
  }

  addPersonOfInterest(account: Account, personOfInterest: AccountPersonOfInterest): Observable<AccountUpdateResult> {
    return new Observable(observer => {
      this.http.post(`/api/sales/accounts/${account.alias}/contacts`, personOfInterest)
        .map(res => res as AccountUpdateResult || null)
        .subscribe(result => {
          if (result) {
            observer.next(result);
          }
          else
            observer.error();
        });
    });
  }

  updatePersonOfInterest(account: Account, personOfInterest: AccountPersonOfInterest): Observable<AccountUpdateResult> {
    return this.http.put(`/api/sales/accounts/${account.alias}/contacts/${personOfInterest.id}`, personOfInterest)
    .map(res => res as AccountUpdateResult);
  }

  deletePersonOfInterest(account: Account, personOfInterest: AccountPersonOfInterest): Observable<AccountUpdateResult> {
    return this.http.delete(`/api/sales/accounts/${account.alias}/contacts/${personOfInterest.id}`)
    .map(res => res as AccountUpdateResult);
  }

  addUserTask(account: Account, status: AccountStatus, userTask: UserTask): Observable<AccountUpdateResult> {
    return new Observable(observer => {
      this.http.post(`/api/sales/accounts/${account.alias}/statuses/${status.id}/tasks`, userTask)
        .map(res => res as AccountUpdateResult || null)
        .subscribe(result => {
          if (result && result.updated) {
            observer.next(result);
          }
          else
            observer.error();
        })
    })
  }

  deleteUserTask(account: Account, status: AccountStatus, userTask: UserTask): Observable<AccountUpdateResult> {
    return new Observable(observer => {
      this.http.delete(`/api/sales/accounts/${account.alias}/statuses/${status.id}/tasks/${userTask.id}`)
        .map(res => res as AccountUpdateResult || null)
        .subscribe(result => {
          observer.next(result);
        });
    });
  }

  setManager(account: Account, userId: string): Observable<AccountUpdateResult> {
    return this.http.put(`/api/sales/accounts/${account.alias}/manager`, {
      Id: userId
    })
    .map(res => res as AccountUpdateResult);
  }

  saveCustomer(account: Account): Observable<AccountUpdateResult> {
    return new Observable(observer => {
      this.http.put(`/api/sales/accounts/${account.id}/customer`, account.customer)
        .map(res => res as AccountUpdateResult || null)
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
      this.http.put(`/api/sales/accounts/${account.id}`, account)
        .map(res => res as AccountUpdateResult || null)
        .subscribe(result => {
          if (result) {
            this.onAccountUpdate.next(account);
          }

          observer.next(result);
        });
    });
  }
}
