import { Component, OnInit } from '@angular/core';
import { PlannerContainer } from '../models/plannerContainer';
import { MarketingService } from '../marketing.service';
import { UiState, UiStateComponentObject } from 'common/interfaces';
import { RouteTransitionAnimation, DoneLoadingTransitionAnimation } from 'common/ui/animations';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'ccrm-sales-marketing-list-view',
    templateUrl: './list-view.component.html',
    animations: [ RouteTransitionAnimation, DoneLoadingTransitionAnimation ],
    host: { '[@routeTransition]': 'true' }
})
export class ListViewComponent implements OnInit, UiState {
    plannerContainers: Array<PlannerContainer> = [];

    uiState: UiStateComponentObject = new UiStateComponentObject(true);

    constructor(
        private marketingService: MarketingService
    ) {}

    ngOnInit() {
        this.marketingService.getPlannerContainers().subscribe(
            plannerContainers => {
                this.plannerContainers = plannerContainers;            
            }, 
            error => {
                this.uiState.onError(error);
            },
            () => console.log('done')
        );
    }

    uiOnDoneLoading(event: Event) {
        console.log('on done loading');
    }

    uiOnComplete() {
        this.uiState.isComplete = true;
    }

    uiOnError() {
        
    }
}
