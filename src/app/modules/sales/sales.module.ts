import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SharedModule } from 'app/shared.module';

import { AccountsModule } from './accounts/accounts.module';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'accounts',
    loadChildren: 'app/modules/sales/accounts/accounts.module#AccountsModule'
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ DashboardComponent ],  
  providers: [],
  exports: [
    
  ],
  bootstrap: [ DashboardComponent ]
})
export class SalesModule {}
