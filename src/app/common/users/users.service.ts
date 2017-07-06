import { Injectable } from '@angular/core';
import { envOptions } from '.environments/options';
import { Response } from '@angular/http';
import { AuthHttpExtended } from '../authentication/auth-http-extended';
import { Observable } from 'rxjs/Observable';
import { UserTask } from 'app/user-tasks';
import { AuthenticationService } from '../authentication/authentication.service';
import * as Auth0 from 'auth0-js';
import { ClientService } from '../../clients/client.service';
import { SelectItem } from '../select/select-item';
import { User } from './user';

@Injectable()
export class UsersService {
    private baseAddr: string = "/api/users";

    constructor(
        private http: AuthHttpExtended,
        private clientService: ClientService,
        private authService: AuthenticationService
    ) {}

    private _user: User = null;
    getProfile(): Observable<User> {
        return new Observable(observer => {
            if(this._user === null) {
                this.http.get(`${this.baseAddr}/me/profile`)
                .map(res => res.json() as User || null)
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

    private _getState: any = null;
    getState(): Observable<any> {
        return new Observable(observer => {
            if(this._getState === null) {
                this.http.get(`${this.baseAddr}/state`).subscribe((res: Response) => {
                    let jsonResult = res.json() || null;

                    if(jsonResult) {
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
        this.http.post(`${this.baseAddr}/state`, {
            StateId: stateId,
            State: value
        }).subscribe(state => {
            if(this._getState !== null) {
                this._getState[stateId] = value;
            }
        });
    }

    getUsers(): Array<User> {
        return this.clientService.users;
    }

    getUsersAsSelect(): Array<SelectItem> {
        var users: Array<SelectItem> = [];

        if(this.clientService.users && this.clientService.users.length > 0) {
            this.clientService.users.forEach((user: User) => {
                users.push(new SelectItem(user.id, user.fullName));
            })
        }

        return users;
    }
}