import { Component, Input, ViewChildren, ContentChildren, QueryList, AfterViewChecked, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TabComponent } from './tab.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'ccrm-tabs',
    templateUrl: './tabs.component.html',
    animations: [

    ]
})
export class TabsComponent implements AfterViewInit, OnDestroy {
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    @Input('default') defaultIndex: number = 0;

    private tabListener: Array<Subscription> = [];

    ngAfterViewInit() {
        if(this.tabs && this.tabs.length > 0) {
            this.getTabItems();
        }
    }

    public onTabClicked(tab: TabComponent, event: Event) {
        tab.onTabClick(event);
    }

    private onTabActivated(tab: TabComponent) {
        this.tabs.forEach(_tab => {
            _tab.deactivate(false);
        });

        tab.active = true;
    }

    private getTabItems() {
        this.tabs.forEach((tab, index) => {
            this.tabListener[index] = tab.onTabActivated.subscribe(activated => {
                this.onTabActivated(tab);
            });
        });

        this.getDefaultItem();
    }

    private getDefaultItem() {
        this.tabs.first.activate();
    }

    ngOnDestroy() {
        this.tabListener.forEach(listener => {
            if(!listener.closed)
                listener.unsubscribe();
        })
    }
}
