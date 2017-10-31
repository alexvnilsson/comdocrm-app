import { User } from 'app/common/users/user';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import * as usersStore from 'app/common/users/store';

@Component({
  selector: 'ccrm-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss']
})
export class SelectUserComponent implements OnInit {
  @ViewChild('selectUserForm') ngForm: NgForm;
  @Input() users: Array<User>;
  
  @Input() header: string;
  @Input() multiple = false;

  form: {
    ids: { [key: string]: boolean }
  } = { ids: {} };

  @Output() onUsersSelected: EventEmitter<Array<User>> = new EventEmitter();
  @Output() onClosed: EventEmitter<any> = new EventEmitter();

  constructor() {
    
  }

  ngOnInit() {
    
  }

  shouldShowSubmitButton(): boolean {
    return this.multiple === true;
  }

  onUserClicked(user: User) {
    this.form.ids[user.id] = !this.form.ids[user.id];

    if (this.form.ids[user.id] === true && this.ngForm.valid && this.multiple !== true) {
      this.ngForm.ngSubmit.emit();
    }
  }

  onFormSubmit(form: NgForm) {
    if (form.valid) {
      let users: Array<User> = [];
      for (let id of Object.getOwnPropertyNames(this.form.ids)) {
        if (this.form.ids[id] === true) {
          let user = this.users.find(u => u.id === id);

          if (typeof user !== 'undefined') {
            users.push(user);
          }
        }
      }

      this.onUsersSelected.emit(users);
      
      this.reset();
      this.onClosed.emit(true);
    }
  }

  reset() {
    this.form = { ids: {}};
  }
}
