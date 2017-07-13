import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

import { UserTasksService } from './user-tasks.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AngularFontAwesomeModule
    ],
    declarations: [
        
    ],
    providers: [
        
    ],
    exports: [
        
    ]
})
export class UserTasksModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UserTasksModule,
            providers: [
                UserTasksService
            ]
        }
    };
}
