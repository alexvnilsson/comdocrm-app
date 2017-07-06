import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'ccrm-ui-navbar-sub',
  templateUrl: './navbar-sub.component.html',
  styleUrls: ['./navbar-sub.component.scss'],
  animations: [
        trigger('pageNavigationTransition', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate('150ms 100ms', keyframes([
                    style({ opacity: 0, transform: 'translateX(-30%)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(0%)', offset: 1 })
                ]))
            ]),
            transition('* => void', [
                animate('150ms', keyframes([
                    style({ opacity: 1, offset: 0 }),
                    style({ opacity: 0, offset: 1 })
                ]))
            ])
        ])
    ]
})
export class NavbarSubComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
