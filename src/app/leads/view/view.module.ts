import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'app/shared.module';

import { LeadsService } from 'app/leads/leads.service';

import { ViewComponent } from './view.component';
import { StatusSelectorComponent } from 'app/leads/status/status-selector.component';
import { TimelineService, TimelineComponent, TimelineItemComponent } from 'app/leads/view/timeline/timeline';
import { TimelineAddMessageComponent } from './timeline-add-message.component';

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
