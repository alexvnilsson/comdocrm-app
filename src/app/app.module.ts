import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, RouterOutletMap, Routes } from '@angular/router';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { NavbarModule } from './navbar.module';
import { LeadsModule } from './leads/leads.module';

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
    LeadsModule,
    RouterModule.forRoot(moduleRoutes),
    NavbarModule,
    Ng2Bs3ModalModule
  ],
  providers: [RouterOutletMap],
  bootstrap: [AppComponent],
  exports: [Ng2Bs3ModalModule]
})
export class AppModule { }
