import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttpExtended } from 'common/authentication';
import { ComdoCrmCommonModule } from 'common';
import { UserTasksModule } from 'module-user-tasks';

import { AccountsService } from './accounts.service';
import { AccountSourcesService } from './account-sources.service';

import { ListViewComponent } from './list-view/list-view.component';
import { DetailsViewComponent } from './details-view/details-view.component';
import { StatusItemComponent } from './details-view/status-view/status-item/status-item.component';
import { AddPersonOfInterestComponent } from './details-view/account-editor/add-person-of-interest/add-person-of-interest.component';
import { PersonOfInterestComponent } from './details-view/person-of-interest/person-of-interest.component';
import { AddReminderComponent } from './details-view/status-view/add-reminder/add-reminder.component';
import { AddReminderInlineComponent } from './details-view/status-view/status-item/add-reminder-inline/add-reminder-inline.component';
import { ComposerComponent } from './details-view/status-view/composer/composer.component';
import { LogComposerComponent } from './details-view/status-view/composer/log-composer/log-composer.component';
import { ListItemComponent } from './list-view/list-item/list-item.component';

const routes: Route[] = [
    {
        path: '',
        component: ListViewComponent
    },
    
    {
        path: 'view/:slug',
        component: DetailsViewComponent,
        children: [
            {
                path: 'contacts-add',
                component: AddPersonOfInterestComponent,
                outlet: 'modal'
            },
            {
                path: 'reminders-add/:id/:details',
                component: AddReminderComponent,
                outlet: 'modal'
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
        RouterModule.forChild(routes),
        UserTasksModule
    ],
    declarations: [
        ListViewComponent,
        ListItemComponent,
        DetailsViewComponent,
        ComposerComponent,
        AddPersonOfInterestComponent,
        StatusItemComponent,
        LogComposerComponent,
        PersonOfInterestComponent,
        AddReminderComponent,
        AddReminderInlineComponent
    ],
    providers: [
        AccountsService,
        AccountSourcesService
    ],
    bootstrap: [ListViewComponent]
})
export class AccountsModule {}
