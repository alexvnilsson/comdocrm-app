import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserTasksService } from './user-tasks.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
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
