import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SharedModule } from 'app/shared.module';

import { AccountsModule } from './accounts/accounts.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuardService } from 'app/auth/auth-guard.service';

import { NavbarComponent, NavbarRouteConfig } from 'app/navbar/navbar.component';

const routes: NavbarRouteConfig = [
  {
    mainNav: true,
    path: 'accounts',
    href: '/sales/accounts',
    text: 'Accounts',
    data: {
      scopes: ['read:accounts', 'write:accounts']
    },
    canLoad: [ AuthGuardService ],
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
    RouterModule
  ]
})
export class SalesModule {}
