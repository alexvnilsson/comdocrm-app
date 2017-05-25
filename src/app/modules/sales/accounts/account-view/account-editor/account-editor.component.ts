import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

import { Account } from '../../account';

@Component({
  selector: 'app-account-editor',
  templateUrl: './account-editor.component.html',
  styleUrls: ['./account-editor.component.scss']
})
export class AccountEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('modalAccountEditor') modalChild: ModalDirective;
  @Input() account: Account;

  @ViewChild('elementAccountEmail') elementEmail;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.modalChild.onShown.subscribe(() => {
      this.focusElement(this.elementEmail);
    });
  }

  onSaveAccount() {
    
  }

  openModal() {
    this.modalChild.show();


  }

  closeModal() {
    this.modalChild.hide();
  }

  focusElement(el: any) {
    if(el && el.nativeElement)
      el.nativeElement.focus();
  }
}
