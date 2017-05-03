import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { LeadsService } from 'app/leads/leads.service';

import { NavbarModule } from 'app/navbar.module';
import { LeadsComponent } from 'app/leads/leads.component';
import { LeadListItemComponent } from 'app/leads/lead-list-item.component';
import { LeadDetailsComponent } from 'app/leads/lead-details.component';

const moduleRoutes: Routes = [
    {
        path: 'leads',
        component: LeadsComponent
    }
];

@NgModule({
  declarations: [
    LeadsComponent,
    LeadListItemComponent,
    LeadDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(moduleRoutes),
    NavbarModule,
    Ng2Bs3ModalModule
  ],
  providers: [LeadsService],
  bootstrap: [LeadsComponent]
})
export class LeadsModule { }
