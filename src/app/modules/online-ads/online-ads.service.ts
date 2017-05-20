import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { Settings } from 'app/constants';

@Injectable()
export class OnlineAdsService {
  private apiHost = Settings.apiHost + '/ads';

  constructor(private http: Http) { }

  getAuthentication() {
    let authWindow = window.open('assets/static/oauthconsent.html', '_blank', 'width=500,height=720,toolbar=false,centerscreen=yes');

    console.log("opened");
      
    let authWindowClosedHandler = () => {
      if(authWindow.closed) {
        console.log("closed");

        this.http.get(this.apiHost + '/adwords/auth/check')
          .subscribe((res: Response) => {
            let data = res.json() || null;

            if(data) {
                if(data.autenticated == true) {
                  alert("we're cool");
                }
            }
          });
      }
      else
        setTimeout(authWindowClosedHandler, 1500);
    };
    setTimeout(authWindowClosedHandler, 1500);
  }
}
