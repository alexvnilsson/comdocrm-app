import { NgModule, ModuleWithProviders } from '@angular/core';
import { ListViewComponent } from './list-view/list-view.component';
import { ComdoCrmCommonModule } from 'app/common';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        ComdoCrmCommonModule,
    ],
    declarations: [
        ListViewComponent
    ],
    exports: [

    ],
    bootstrap: [
        ListViewComponent
    ]
})
export class UsersModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: UsersModule,
            providers: [

            ]
        }
    }
}
