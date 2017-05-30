import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { RouterModule, RouterOutletMap, Routes } from '@angular/router';

import { SharedModule } from 'app/shared.module';
import { OnlineAdsModule } from 'app/modules/online-ads/online-ads.module';
import { SalesModule } from 'app/modules/sales/sales.module';

import { AuthGuardService } from 'app/auth/auth-guard.service';

import { AppComponent } from './app.component';
import { NavbarComponent, NavbarRouteConfig } from './navbar/navbar.component';

const moduleRoutes: NavbarRouteConfig = [
    {
        path: '',
        loadChildren: 'app/modules/home/home.module#HomeModule',
        data: {
          scopes: ['nothing']
        }
    },
    {
      mainNav: true,
      path: 'sales',
      href: '/sales',
      text: 'Sales',
      faIcon: 'user-circle-o',
      children: [
        {
          mainNav: true,
          path: 'accounts',
          href: '/sales/accounts',
          loadChildren: 'app/modules/sales/accounts/accounts.module#AccountsModule',
          text: 'Accounts',
          faIcon: 'building-o',
          canActivate: [ AuthGuardService ],
          data: {
            scopes: ['read:accounts', 'write:accounts']
          }
        }
      ]
    },
    {
      mainNav: true,
      path: 'ads',
      href: '/ads',
      loadChildren: 'app/modules/online-ads/online-ads.module#OnlineAdsModule',
      text: 'Adverts',
      faIcon: 'newspaper-o'
    },
    {
      mainNav: false,
      path: 'auth',
      loadChildren: 'app/auth/auth.module#AuthModule'
    }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(moduleRoutes),
    SharedModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent
  ],  
  providers: [
    RouterOutletMap
  ],
  bootstrap: [ AppComponent ],
  exports: [
    
  ]
})
export class AppModule { }