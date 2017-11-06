import { CustomRoute } from 'app/common/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ccrm-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
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
