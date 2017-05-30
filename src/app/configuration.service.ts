import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

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

   public getConfiguration(callback: (configuration: Configuration) => any) {
    this.http.get('assets/conf/auth.json')
      .map((res: Response) => res.json())
      .subscribe(
        data => callback(data),
        error => console.log(error)
      );
   }
}
