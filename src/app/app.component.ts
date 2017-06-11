import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '@comdocrm/common/authentication';
import { TranslateService } from '@comdocrm/common/i18n/translate.service';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import { RouteTransitionAnimation } from '@comdocrm/common/ui/animations';

@Component({
  selector: 'app-root',
  animations: [
      RouteTransitionAnimation
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private authService: AuthenticationService, private translateService: TranslateService) {}

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.authService.handleAuthentication();
  }
}