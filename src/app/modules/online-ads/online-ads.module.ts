import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { OnlineAdsService } from './online-ads.service';

import { NavbarRouteConfig } from 'app/navbar/navbar-route.config';

const moduleRoutes: NavbarRouteConfig = [
    {
      path: '',
      component: DashboardComponent
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(moduleRoutes)
  ],
  declarations: [ DashboardComponent ],
  providers: [
    OnlineAdsService
  ],
  exports: [
    
  ]
})
export class OnlineAdsModule { }
