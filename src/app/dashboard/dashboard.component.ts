import { RouteTransitionAnimation } from './../common/ui/animations/route-transition.animation';
import { Component } from '@angular/core';

@Component({
  selector: 'ccrm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [RouteTransitionAnimation],
  host: {
    '[@routeTransition]': ''
  }
})
export class DashboardComponent {

}
