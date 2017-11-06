import { LeadDetailsViewComponent } from './views/lead-details-view/lead-details-view.component';
import { DashboardViewComponent } from './views/dashboard-view/dashboard-view.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { Http } from '@angular/http';
import { ComdoCrmCommonModule } from 'app/common';
import { CommonUiModule } from 'app/common-ui';
import { UserTasksModule } from 'app/user-tasks';
import { EffectsModule, Effect } from '@ngrx/effects';

import { AccountLeadsService, AccountSourcesService } from './services';

import * as accountLeadsStore from './store/accounts/leads';

import { ListViewComponent } from './views/list-view/list-view.component';

import { ListLeadsViewComponent } from './views/list-leads-view/list-leads-view.component';
import { LeadCardComponent } from './views/list-leads-view/lead-card/lead-card.component';

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

import { AccountsListContainer } from './containers/accounts-list';
import { AccountLeadsListContainer } from './containers/account-leads-list';
import { AccountDetailsContainer } from './containers/account-details';
import { AccountDetailsSelectedContainer } from './containers/account-details-selected';

import { routes } from './accounts.routes';
import { DetailsViewSidePanelComponent } from './views/details-view/details-view-side-panel/details-view-side-panel.component';


@NgModule({
  imports: [
    CommonModule,
    ComdoCrmCommonModule,
    CommonUiModule,
    RouterModule.forChild(routes),
    UserTasksModule
  ],
  declarations: [
    AccountsListContainer,
    AccountLeadsListContainer,
    AccountDetailsContainer,
    AccountDetailsSelectedContainer,

    /* Account components */
    ListViewComponent,
    ListItemComponent,
    DetailsViewComponent,
    ComposerComponent,
    AddPersonOfInterestComponent,
    StatusItemComponent,
    LogComposerComponent,
    PersonOfInterestComponent,
    AddReminderInlineComponent,


    /* Lead components */
    ListLeadsViewComponent,
    LeadCardComponent,
    LeadDetailsViewComponent,

    AllStatusesComponent,

    InitialEditorComponent,

    DashboardViewComponent,

    DetailsViewSidePanelComponent
  ],
  providers: [
    AccountLeadsService,
    AccountSourcesService
  ],
  bootstrap: [ListViewComponent],
  exports: [
    ListItemComponent,
    DashboardViewComponent
  ]
})
export class AccountsModule { }
