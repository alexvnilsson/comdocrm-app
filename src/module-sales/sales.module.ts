import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { Http } from '@angular/http';
import { ComdoCrmCommonModule } from 'common';

import { AccountsModule } from './accounts/accounts.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    ComdoCrmCommonModule,
    RouterModule
  ],
  declarations: [DashboardComponent],
  providers: [],
  exports: [
    RouterModule
  ]
})
export class SalesModule {}
