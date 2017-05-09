import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'app/shared.module';

import { LeadsService } from 'leads/leads.service';

import { ViewComponent } from './view.component';
import { StatusSelectorComponent } from 'leads/status/status-selector.component';
import { TimelineService } from 'leads/view/timeline/timeline';
import { TimelineComponent } from 'leads/view/timeline/timeline.component';
import { TimelineItemComponent } from 'leads/view/timeline/timeline-item.component';

const moduleRoutes: Routes = [
    {
        path: 'leads/:company/:lead',
        component: ViewComponent
    }
];

@NgModule({
  declarations: [
    ViewComponent,
    StatusSelectorComponent,
    TimelineComponent,
    TimelineItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(moduleRoutes),
    SharedModule
  ],
  providers: [
      LeadsService,
      TimelineService
    ],
  bootstrap: [ViewComponent]
})
export class ViewModule { }
