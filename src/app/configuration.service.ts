import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthOptions } from 'auth0-js';

export class Configuration {
  clientId: string;
  domain: string;
  responseType: string;
  audience: string;
  scope: string;
}

@Injectable()
export class ConfigurationService {
  private configuration: Configuration = null;

  constructor(private http: Http) {
    
   }

   public getConfiguration(configurationName: string, callback: (configuration: any) => any) {
    this.http.get(`assets/conf/${configurationName}.json`)
      .map((res: Response) => res.json())
      .subscribe(
        data => callback(data),
        error => console.log(error)
      );
   }
}
