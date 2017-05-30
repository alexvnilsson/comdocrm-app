import { Component, OnInit, AfterViewInit, AfterContentInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { AccountsService, AccountUpdateResult } from '../../accounts.service';
import { Account } from '../../account';

@Component({
  selector: 'app-account-editor',
  templateUrl: './account-editor.component.html',
  styleUrls: ['./account-editor.component.scss']
})
export class AccountEditorComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  @ViewChild('modal') modal: ModalDirective;
  account: Account = null;

  public state = {
    loading: true,
    error: null
  };

  constructor(private location: Location, private activatedRoute: ActivatedRoute, private accountsService: AccountsService) { 
    
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.accountsService.getBySlug(params.slug, this.onAccountLoad.bind(this), this.onAccountLoadError.bind(this));
    });
  }

  onAccountLoad(account: Account) {
    this.account = account;

    this.state.loading = false;
  }

  onAccountLoadError(message: string, code: string) {
    this.state.loading = false;
    this.state.error = true;
  }

  ngAfterViewInit() {
    this.modal.show();

    this.modal.onShown.subscribe(() => {

    });

    this.modal.onHidden.subscribe(() => {
      this.location.back();
    });
  }

  ngAfterContentInit() {
    
  }

  saveAccount() {
    this.accountsService.saveChanges(this.account, (result: AccountUpdateResult) => {
      if(result.updated) {
        this.hideModal();
      }
      else {
        console.log(result);
      }
    });
  }

  hideModal() {
    this.modal.hide();
  }

  ngOnDestroy() {
    
  }

  focusElement(el: any) {
    if(el && el.nativeElement)
      el.nativeElement.focus();
  }
}
