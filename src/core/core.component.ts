import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'common/authentication';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import { RouteTransitionAnimation } from 'common/ui/animations';

@Component({
  selector: 'ccrm-core',
  animations: [
      RouteTransitionAnimation
  ],
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit, AfterViewInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    
  }
}