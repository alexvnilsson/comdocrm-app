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
    @ContentChildren(VerticalNavigationItemComponent) items: QueryList<VerticalNavigationItemComponent>;

    @Input('default') default = 0;

    private itemListener: Array<Subscription> = [];

    ngAfterContentInit() {
        if (this.items && this.items.length > 0) {
            this.getItems();
        }
    }

    public onItemClicked(item: VerticalNavigationItemComponent, event: Event) {
        item.onItemClick(event);
    }

    private onItemActivated(item: VerticalNavigationItemComponent) {
        this.items.forEach(_item => {
            _item.deactivate(false);
        });

        item.active = true;
    }

    private getItems() {
        this.items.forEach((item, index) => {
            this.itemListener[index] = item.Activated.subscribe(activated => {
                this.onItemActivated(item);
            });
        });

        this.getDefaultItem();
    }

    private getDefaultItem() {
        this.items.first.activate();
    }

    ngOnDestroy() {
        this.itemListener.forEach(listener => {
            if (!listener.closed) {
                listener.unsubscribe();
            }
        });
    }
}
