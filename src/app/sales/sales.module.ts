import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { Http } from '@angular/http';
import { ComdoCrmCommonModule } from 'app/common';

import { AccountsModule } from './accounts/accounts.module';
import { DashboardComponent } from './dashboard/dashboard.component';

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
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent],
  providers: [],
  exports: [
    RouterModule
  ]
})
export class SalesModule {}
