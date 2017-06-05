import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SharedModule } from 'app/shared.module';

import { AuthGuardService } from 'app/auth/auth-guard.service';
import { AccountsService } from './accounts.service';
import { AccountSourcesService } from './account-sources.service';

import { ListViewComponent } from './list-view/list-view.component';
import { AccountViewComponent } from './account-view/account-view.component';
import { AccountEditorComponent } from './account-view/account-editor/account-editor.component';
import { StatusItemComponent } from './account-view/status-view/status-item/status-item.component';
import { StatusViewComponent } from './account-view/status-view/status-view.component';

import { AddStatusComponent } from './account-view/add-status/add-status.component';

const routes: Route[] = [
    {
        path: '',
        component: ListViewComponent
    },
    {
        path: 'edit/:slug',
        component: AccountEditorComponent,
        outlet: 'modal'
    },
    {
        path: 'view/:slug',
        component: AccountViewComponent
    },
    {
        path: 'status-add/:slug',
        component: AddStatusComponent,
        outlet: 'modal'
    }
]

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ListViewComponent,
        AccountViewComponent,
        AccountEditorComponent,
        StatusItemComponent,
        StatusViewComponent,
        AddStatusComponent
    ],
    providers: [
        AccountsService,
        AccountSourcesService
    ],
    bootstrap: [ListViewComponent]
})
export class AccountsModule { }
