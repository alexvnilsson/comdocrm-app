import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttpExtended } from 'app/common/authentication';
import { ComdoCrmCommonModule } from 'app/common';
import { UserTasksModule } from 'app/user-tasks';

import { AccountsService } from './accounts.service';
import { AccountSourcesService } from './account-sources.service';

import { ListViewComponent } from './list-view/list-view.component';
import { DetailsViewComponent } from './details-view/details-view.component';
import { StatusItemComponent } from './details-view/status-view/status-item/status-item.component';
import { AddPersonOfInterestComponent } from './details-view/account-editor/add-person-of-interest/add-person-of-interest.component';
import { PersonOfInterestComponent } from './details-view/person-of-interest/person-of-interest.component';
import { AddReminderInlineComponent } from './details-view/status-view/status-item/add-reminder-inline/add-reminder-inline.component';
import { ComposerComponent } from './details-view/status-view/composer/composer.component';
import { LogComposerComponent } from './details-view/status-view/composer/log-composer/log-composer.component';
import { ListItemComponent } from './list-view/list-item/list-item.component';
import { AllStatusesComponent } from './list-view/all-statuses/all-statuses.component';
import { CommonUiModule } from '../../common-ui/common-ui.module';
import { InitialEditorComponent } from './details-view/account-editor/initial-editor/initial-editor.component';

const routes: Route[] = [
    {
        path: '',
        component: ListViewComponent
    },
    {
        path: 'create',
        component: InitialEditorComponent,
        outlet: 'account'
    },
    {
        path: ':slug',
        component: DetailsViewComponent,
        children: [
            {
                path: 'initial',
                component: InitialEditorComponent,
                outlet: 'editor'
            },
            {
                path: 'add',
                component: AddPersonOfInterestComponent,
                outlet: 'contacts'
            },
            {
                path: 'log',
                component: LogComposerComponent,
                outlet: 'compose'
            }
        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        ComdoCrmCommonModule,
        CommonUiModule,
        RouterModule.forChild(routes),
        UserTasksModule
    ],
    declarations: [
        ListViewComponent,
        ListItemComponent,
        AllStatusesComponent,
        DetailsViewComponent,
        ComposerComponent,
        AddPersonOfInterestComponent,
        StatusItemComponent,
        LogComposerComponent,
        PersonOfInterestComponent,
        AddReminderInlineComponent,
        InitialEditorComponent
    ],
    providers: [
        AccountsService,
        AccountSourcesService
    ],
    bootstrap: [ListViewComponent]
})
export class AccountsModule {}
