import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { Http } from '@angular/http';
import { ComdoCrmCommonModule } from 'app/common';

import { AccountsModule } from './accounts/accounts.module';

import { DashboardComponent } from './dashboard/views/dashboard/dashboard.component';

const routes: Route[] = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'accounts',
        loadChildren: './accounts/accounts.module#AccountsModule'
    }
];

@NgModule({
  imports: [
    CommonModule,
    ComdoCrmCommonModule,
    RouterModule.forChild(routes),
    AccountsModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [],
  exports: [
    DashboardComponent
  ]
})
export class SalesModule {}
