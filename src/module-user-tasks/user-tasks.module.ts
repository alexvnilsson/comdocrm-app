import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

import { UserTasksService } from './user-tasks.service';
import { UserTasksStore } from './user-tasks.store';

import { CreateTaskComponent } from './components/create-task/create-task.component';

import { ListViewComponent } from './components/list-view/list-view.component';
import { ListViewItemComponent } from './components/list-view-item/list-view-item.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AngularFontAwesomeModule
    ],
    declarations: [
        CreateTaskComponent,
        ListViewComponent,
        ListViewItemComponent
    ],
    providers: [
        
    ],
    exports: [
        CreateTaskComponent,
        ListViewComponent,
        ListViewItemComponent
    ]
})
export class UserTasksModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UserTasksModule,
            providers: [
                UserTasksService,
                UserTasksStore
            ]
        }
    };
}
