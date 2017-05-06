import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { RouterModule, RouterOutletMap, Routes } from '@angular/router';

import { SharedModule } from 'app/shared.module';
import { LeadsModule } from 'app/leads/leads.module';

import { NavbarComponent } from './navbar/navbar.component';
import { NavbarItemDirective } from 'app/navbar/navbar-item.directive';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const moduleRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
  declarations: [
    NavbarComponent,
    NavbarItemDirective,
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(moduleRoutes),
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
