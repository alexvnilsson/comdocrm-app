import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttpExtended } from '../authentication/auth-http-extended';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {
    private baseAddr: string = "/api/users";

    constructor(private http: AuthHttpExtended) {}

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
}