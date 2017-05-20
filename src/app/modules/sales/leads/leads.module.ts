import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpModule, RequestOptions, Http } from '@angular/http';
import { SharedModule } from 'app/shared.module';

import { ViewModule } from './view/view.module';

import { LeadsService } from './leads.service';
import { TimelineService } from './view/timeline/timeline.service';

import { LeadsComponent } from './leads.component';
import { LeadListItemDirective } from './lead-list-item.directive';

const routes: Route[] = [
  {
    path: '',
    component: LeadsComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpModule,
    RouterModule.forChild(routes),
    ViewModule
  ],
  declarations: [
    LeadsComponent,
    LeadListItemDirective
  ],
  providers: [
    LeadsService,
    TimelineService
  ],
  exports: [
    LeadsComponent
  ],
  bootstrap: [ LeadsComponent ]
})
export class LeadsModule { }
