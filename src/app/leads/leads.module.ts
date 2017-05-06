import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'app/shared.module';
import { ViewModule } from 'app/leads/view/view.module';

import { LeadsService } from 'app/leads/leads.service';

import { LeadsComponent } from 'app/leads/leads.component';
import { LeadListItemDirective } from 'app/leads/lead-list-item.directive';

const moduleRoutes: Routes = [
    {
        path: 'leads',
        component: LeadsComponent
    }
];

@NgModule({
  declarations: [
    LeadsComponent,
    LeadListItemDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(moduleRoutes),
    SharedModule,
    ViewModule
  ],
  providers: [LeadsService],
  bootstrap: [LeadsComponent]
})
export class LeadsModule { }
