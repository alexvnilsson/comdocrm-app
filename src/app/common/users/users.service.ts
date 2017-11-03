import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '.env';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserTask } from 'app/user-tasks';
import { AuthenticationService } from '../authentication/authentication.service';
import * as Auth0 from 'auth0-js';
import { SelectItem } from '../select/select-item';
import { User } from './user';

@Injectable()
export class UsersService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  private _user: User = null;
  getProfile(): Observable<User> {
    return new Observable(observer => {
      if (this._user === null) {
        this.http.get(`/api/users/me/profile`)
          .map(res => res as User || null)
          .subscribe(user => {
            this._user = user;

            observer.next(user);
          })
      }
      else {
        observer.next(this._user);
      }
    })
  }

  getAuth0Profile(): Observable<Auth0.Auth0UserProfile> {
    return new Observable(observer => 
      this.http.get(`https://${environment.auth0.domain}/userinfo`)
      .map(res => res as Auth0.Auth0UserProfile)
      .subscribe(profile => observer.next(profile), (err: any) => observer.error(err))
    );
  }

  private _getState: any = null;
  getState(): Observable<any> {
    return new Observable(observer => {
      if (this._getState === null) {
        this.http.get(`/api/users/state`)
        .subscribe(jsonResult => {
          if (jsonResult) {
            this._getState = jsonResult;
            observer.next(this._getState);
          }
        }, (error: any) => {
          observer.error(error);
        });
      }
    });
  }

  setState(stateId: string, value: any) {
    this.http.post(`/api/users/state`, {
      StateId: stateId,
      State: value
    }).subscribe(state => {
      if (this._getState !== null) {
        this._getState[stateId] = value;
      }
    });
  }

  getUsers(): Observable<User[]> {
    return new Observable(observer => {
      this.http.get('api/users')
        .map(res => res as User[] || null)
        .subscribe(users => observer.next(users))
    });
  }

  getUsersAsSelect(): Array<SelectItem> {
    var users: Array<SelectItem> = [];

    

    return users;
  }
}