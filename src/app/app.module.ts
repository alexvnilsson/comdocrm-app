import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, RouterOutletMap, Routes } from '@angular/router';

import { SharedModule } from 'app/shared.module';
import { LeadsModule } from 'app/leads/leads.module';

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
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(moduleRoutes),
    SharedModule,
    LeadsModule
  ],
  providers: [RouterOutletMap],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
