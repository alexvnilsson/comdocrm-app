import { NgModule } from '@angular/core';
import { ComdoCrmCommonModule } from '../../common/common.module';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ListViewComponent } from './views/list-view/list-view.component';
import { ProductsService } from './services/products.service';

const routes: Route[] = [
    {
        path: '',
        component: ListViewComponent
    }
];

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
        ProductsService
    ],
    exports: [

    ],
    bootstrap: [
        ListViewComponent
    ]
})
export class ProductsModule {

}
