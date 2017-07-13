import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttpExtended } from 'app/common/authentication';
import { ComdoCrmCommonModule } from 'app/common';
import { CommonUiModule } from '../../common-ui/common-ui.module';
import { UserTasksModule } from 'app/user-tasks';

import { AccountsService } from './services/accounts.service';
import { AccountSourcesService } from './services/account-sources.service';

import { ListViewComponent } from './views/list-view/list-view.component';
import { DetailsViewComponent } from './views/details-view/details-view.component';
import { StatusItemComponent } from './views/details-view/status-view/status-item/status-item.component';
import { AddPersonOfInterestComponent } from './views/details-view/account-editor/add-person-of-interest/add-person-of-interest.component';
import { PersonOfInterestComponent } from './views/details-view/person-of-interest/person-of-interest.component';
import { AddReminderInlineComponent } from './views/details-view/status-view/status-item/add-reminder-inline/add-reminder-inline.component';
import { ComposerComponent } from './views/details-view/status-view/composer/composer.component';
import { LogComposerComponent } from './views/details-view/status-view/composer/log-composer/log-composer.component';
import { ListItemComponent } from './views/list-view/list-item/list-item.component';
import { AllStatusesComponent } from './views/list-view/all-statuses/all-statuses.component';

import { InitialEditorComponent } from './views/details-view/account-editor/initial-editor/initial-editor.component';
import { AccountDetailsContainerComponent } from './containers/account-details';
import { AccountDetailsSelectedContainerComponent } from './containers/account-details-selected';

import { routes } from './accounts.routes';
import { AccountsListContainerComponent } from './containers/accounts-list';

@NgModule({
    imports: [
        CommonModule,
        ComdoCrmCommonModule,
        CommonUiModule,
        RouterModule.forChild(routes),
        UserTasksModule
    ],
    declarations: [
        AccountsListContainerComponent,
        AccountDetailsContainerComponent,
        AccountDetailsSelectedContainerComponent,
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
        AccountSourcesService
    ],
    bootstrap: [ListViewComponent]
})
export class AccountsModule {}
