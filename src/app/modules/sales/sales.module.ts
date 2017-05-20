import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SharedModule } from 'app/shared.module';

import { LeadsModule } from './leads/leads.module';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'leads',
    loadChildren: 'app/modules/sales/leads/leads.module#LeadsModule'
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
