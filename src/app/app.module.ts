import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { RouterModule, RouterOutletMap, Routes } from '@angular/router';

import { SharedModule } from 'app/shared.module';
import { LeadsModule } from 'leads/leads.module';

import { AppComponent } from './app.component';
import { NavbarModule, NavbarRouteConfig } from 'navbar/navbar.module';
import { HomeComponent } from 'home/home.component';

const moduleRoutes: NavbarRouteConfig = [
    {
        mainNav: false,
        path: '',
        component: HomeComponent,
        module: null,
        text: 'Home',
        faIcon: 'home'
    }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(moduleRoutes),
    NavbarModule,
    SharedModule,
    LeadsModule,
    BrowserAnimationsModule
  ],
  providers: [
    RouterOutletMap
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
