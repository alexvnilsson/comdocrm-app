import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SharedModule } from 'app/shared.module';
import { AccountsService } from './accounts.service';
import { ListViewComponent } from './list-view/list-view.component';
import { AccountViewComponent } from './account-view/account-view.component';
import { AccountEditorComponent } from './account-view/account-editor/account-editor.component';

const routes: Route[] = [
  {
    path: '',
    component: ListViewComponent
  },
  {
    path: ':id',
    component: AccountViewComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ListViewComponent,
    AccountViewComponent,
    AccountEditorComponent
  ],
  providers: [
    AccountsService
  ],
  bootstrap: [ ListViewComponent ]
})
export class AccountsModule { }
