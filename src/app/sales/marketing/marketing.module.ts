import { NgModule } from '@angular/core';
import { MarketingService } from './marketing.service';
import { Routes, RouterModule } from '@angular/router';
import { ListViewComponent } from './list-view/list-view.component';
import { CommonModule } from '@angular/common';
import { ComdoCrmCommonModule } from 'app/common';

const routes: Routes = [
    {
        path: '',
        component: ListViewComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        ComdoCrmCommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ListViewComponent
    ],
    providers: [
        MarketingService
    ],
    exports: [

    ],
    bootstrap: [
        ListViewComponent
    ]
})
export class MarketingModule { }