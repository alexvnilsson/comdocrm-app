import { VerticalNavigationItemComponent } from './../nav-item/nav-item.component';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ccrm-nav-view',
  templateUrl: './nav-view.component.html',
  styleUrls: ['./nav-view.component.scss']
})
export class VerticalNavigationViewComponent implements OnInit {
  @Input() ref: VerticalNavigationItemComponent;

  constructor() { }

  ngOnInit() {
  }

}
