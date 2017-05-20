import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SharedModule } from 'app/shared.module';

import { ViewComponent } from './view.component';
import { StatusSelectorComponent } from '../status/status-selector.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelineItemComponent } from './timeline/timeline-item.component';

const moduleRoutes: Route[] = [
    {
        path: ':company/:lead/:id',
        component: ViewComponent
    }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(moduleRoutes)
  ],
  declarations: [
    ViewComponent,
    StatusSelectorComponent,
    TimelineComponent,
    TimelineItemComponent
  ],
  providers: [
    
  ],
  exports: [
    
  ],
  bootstrap: [ ViewComponent ]
})
export class ViewModule { }
