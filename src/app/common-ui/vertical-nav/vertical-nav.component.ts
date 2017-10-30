import { VerticalNavigationState } from './../layout/states/navigation';
import { LayoutService } from 'app/common-ui/layout/layout.service';
import { VerticalNavigationItemComponent } from './nav-item/index';
import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  ContentChildren,
  QueryList,
  AfterViewChecked,
  AfterViewInit,
  Output,
  EventEmitter,
  OnDestroy,
  AfterContentInit
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ccrm-vertical-nav',
  templateUrl: './vertical-nav.component.html',
  animations: [

  ]
})
export class VerticalNavigationComponent implements OnInit, AfterContentInit, OnDestroy {
  @ContentChildren(VerticalNavigationItemComponent) items: QueryList<VerticalNavigationItemComponent>;

  @Input() stateId: string;
  @Input() default: string = null;

  private itemListener: Array<Subscription> = [];

  constructor(
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    if (this.stateId == null || this.stateId.length === 0) {
      throw new Error('StateId is required.');
    }
  }

  ngAfterContentInit() {
    if (this.items && this.items.length > 0) {
      this.getItems();
      this.getState();
    }
  }

  private getState() {
    this.layoutService.getNavigationState(this.stateId).subscribe(state => {
      if (state !== null) {
        if (state instanceof VerticalNavigationState) {
          if (state.active != null) {
            let activeItem = this.items.find(item => item.id === state.active);

            if (activeItem != null) {
              this.onItemActivated(activeItem);
            }
          }
        }
      } else {
        this.getDefaultItem();
      }
    });
  }

  private setState() {
    this.layoutService.setNavigationState(
      new VerticalNavigationState(
        this.stateId, this.items.find(item => item.active).id
      )
    );
  }

  public onItemClicked(item: VerticalNavigationItemComponent, event: Event) {
    item.onItemClick(event);
  }

  private onItemActivated(item: VerticalNavigationItemComponent) {
    this.items.forEach(_item => {
      _item.deactivate(false);
    });

    item.active = true;

    this.setState();
  }

  private getItems() {
    this.items.forEach((item, index) => {
      this.itemListener[index] = item.Activated.subscribe(activated => {
        this.onItemActivated(item);
      });
    });
  }

  private getDefaultItem() {
    if (this.default !== null) {
      this.items.find(item => item.id === this.default).activate();
    } else {
      this.items.first.activate();
    }
  }

  ngOnDestroy() {
    this.itemListener.forEach(listener => {
      if (!listener.closed) {
        listener.unsubscribe();
      }
    });
  }
}
