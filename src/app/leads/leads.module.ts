import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { NavbarModule } from '../navbar.module';
import { LeadsComponent } from './leads.component';

const moduleRoutes: Routes = [
    {
        path: 'leads',
        component: LeadsComponent
    }
];

@NgModule({
  declarations: [
    LeadsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(moduleRoutes),
    NavbarModule
  ],
  providers: [],
  bootstrap: [LeadsComponent]
})
export class LeadsModule { }
