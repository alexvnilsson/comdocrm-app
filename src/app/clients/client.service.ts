import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient
  ) {

  }

  load(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve();
    });
  }

  private getClientInformation(): Observable<any> {
    return new Observable(observer => {
      this.http.get('/api/client')
        .map(response => response as ClientInformation)
        .subscribe(client => {
          this._clientInformation = client;

          observer.next(true);
        },
        error => observer.error(error));
    });
  }

  get clientInformation(): ClientInformation {
    if (this._clientInformation)
      return this._clientInformation;

    return null;
  }

  private getAllUsers(): Observable<Array<any>> {
    return new Observable(observer => {
      this.http.get('/api/users')
        .map(response => response as Array<any>)
        .subscribe(users => {
          this._users = users;

          observer.next();
        },
        error => observer.error(error))
    });
  }

  get users(): Array<any> {
    if (this._users)
      return this._users;

    return null;
  }
}