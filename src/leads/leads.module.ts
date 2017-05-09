import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared.module';
import { ViewModule } from 'leads/view/view.module';

import { NavbarRouteConfig } from 'navbar/navbar-item.route';

import { LeadsComponent } from 'leads/leads.component';
import { LeadListItemDirective } from 'leads/lead-list-item.directive';

import { LeadsService } from 'leads/leads.service';

const moduleRoutes: NavbarRouteConfig = [
    {
        mainNav: true,
        path: 'leads',
        component: LeadsComponent,
        module: 'leads',
        text: 'Leads',
        faIcon: 'user-circle-o'
    }
];

@NgModule({
  declarations: [
    LeadsComponent,
    LeadListItemDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(moduleRoutes),
    SharedModule,
    ViewModule
  ],
  exports: [
      LeadsComponent,
      LeadListItemDirective
  ],
  providers: [
      LeadsService
  ],
  bootstrap: [LeadsComponent]
})
export class LeadsModule {}
