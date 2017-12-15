import { CustomRoute } from 'app/common/router';
import { Component, OnInit, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ccrm-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  @HostBinding('[class.header-nav]') _class_headernav = true;

  @Input() routes: Array<CustomRoute> = [];

  @Output() onItemClicked: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.config.forEach((route: CustomRoute) => {
      if (route.mainNav && this.routes.indexOf(route) === -1) {
        this.routes.push(route);
      }
    });
  }

  hasChildren(route: CustomRoute) {
    return route && route.children && route.children.length > 0;
  }

}
