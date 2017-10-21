import { VerticalNavigationItemComponent } from './nav-item/index';
import { Component,
  Input,
  ViewChildren,
  ContentChildren,
  QueryList,
  AfterViewChecked,
  AfterViewInit,
  Output,
  EventEmitter,
  OnDestroy,
  AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'ccrm-vertical-nav',
    templateUrl: './vertical-nav.component.html',
    animations: [

    ]
})
export class VerticalNavigationComponent implements AfterContentInit, OnDestroy {
    @ContentChildren(VerticalNavigationItemComponent) tabs: QueryList<VerticalNavigationItemComponent>;

    @Input('default') defaultIndex: number = 0;

    private tabListener: Array<Subscription> = [];

    ngAfterContentInit() {
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
