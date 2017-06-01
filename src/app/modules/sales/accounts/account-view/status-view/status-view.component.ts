import { Component, Input, OnInit } from '@angular/core';
import { Status } from '../../account';

@Component({
  selector: 'app-status-view',
  templateUrl: './status-view.component.html',
  styleUrls: ['./status-view.component.scss']
})
export class StatusViewComponent implements OnInit {
  @Input() statuses: Status[];

  constructor() { }

  ngOnInit() {
  }

}
