import { NgForm } from '@angular/forms/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ccrm-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss']
})
export class SelectUserComponent implements OnInit {
  @Output() onClosed: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onFormSubmit(form: NgForm) {

  }

}
