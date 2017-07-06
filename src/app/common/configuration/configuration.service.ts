import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigurationService {
  constructor(private http: Http) {}

  public getConfiguration(configurationName: string): Observable<any> {
      return new Observable(observer => {
        this.http.get(`assets/conf/${configurationName}.json`)
            .subscribe((res: Response) => {
                let jsonResult = res.json() || null;

                if(jsonResult) {
                    observer.next(jsonResult);
                } 
            });
      });
  }
}
