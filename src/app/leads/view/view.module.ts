import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'app/shared.module';

import { LeadsService } from 'app/leads/leads.service';

import { ViewComponent } from './view.component';
import { TimelineMessageComponent } from './timeline-message.component';
import { TimelineAddMessageComponent } from './timeline-add-message.component';

const moduleRoutes: Routes = [
    {
        path: 'leads/:name/:id',
        component: ViewComponent
    }
];

@NgModule({
  declarations: [
    ViewComponent,
    TimelineMessageComponent,
    TimelineAddMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(moduleRoutes),
    SharedModule
  ],
  providers: [LeadsService],
  bootstrap: [ViewComponent]
})
export class ViewModule { }
