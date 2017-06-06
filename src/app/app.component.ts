import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { TranslateService } from 'app/i18n/translate.service';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import { RouteTransitionAnimation } from 'app/ui/animations';

@Component({
  selector: 'app-root',
  animations: [
      RouteTransitionAnimation
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private authService: AuthService, private translateService: TranslateService) {}

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.authService.handleAuthentication();
  }
}