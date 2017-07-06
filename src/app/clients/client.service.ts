import { Injectable, OnInit } from '@angular/core';
import { AuthHttpExtended } from '../common/authentication/auth-http-extended';
import { ClientInformation } from './client';
import { Observable } from 'rxjs/Observable';

export function ClientServiceInitFactory(clientService: ClientService): Function {
    return () => clientService.load();
}

@Injectable()
export class ClientService {
    private apiBaseAddr: string = '/api/client';

    private _clientInformation: ClientInformation = null;
    private _users: Array<any> = [];

    constructor(
        private http: AuthHttpExtended
    ) {
        
    }

    load(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getClientInformation().subscribe(() => {
                this.getAllUsers().subscribe(() => {
                    resolve();
                },
                error => { resolve(); });
            },
            error => { resolve(); });
        });
    }

    private getClientInformation(): Observable<any> {
        return new Observable(observer => {
            this.http.get(`${this.apiBaseAddr}`)
            .map(response => response.json() as ClientInformation || null)
            .subscribe(client => {
                this._clientInformation = client;

                observer.next(true);
            },
            error => observer.error(error));
        });
    }

    get clientInformation(): ClientInformation {
        if(this._clientInformation)
            return this._clientInformation;

        return null;
    }

    private getAllUsers(): Observable<Array<any>> {
        return new Observable(observer => {
            this.http.get('/api/users')
            .map(response => response.json() as Array<any> || null)
            .subscribe(users => {
                this._users = users;

                observer.next(true);
            },
            error => observer.error(error))
        });
    }

    get users(): Array<any> {
        if(this._users)
            return this._users;

        return null;
    }
}