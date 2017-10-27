import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  ElementRef,
  ViewChild,
  ContentChild,
  Renderer,
  ViewChildren,
  ContentChildren,
  Output,
  AfterContentInit,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { Subscription } from "rxjs/Subscription";

import { Store } from "@ngrx/store";
import * as fromRoot from "app/app.store";

import * as fromLayout from 'app/common-ui/layout/layout.reducers';
import * as layoutActions from 'app/common-ui/layout/layout.actions';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'modal-container',
  template: `<div class="modal fade" bsModal #modal="bs-modal" [config]="config" (onHidden)="onModalClosed($event)">
        <div [class]="'modal-dialog ' + class" role="document">
            <div class="modal-content">
              <ng-content></ng-content>
            </div>
        </div>
    </div>
    `
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  @ViewChild('modal') contentModal: ModalDirective;

  @Input() id: string;
  @Input() config: any = {};
  @Input() class: string;

  private onDisabledSubscription: Subscription;

  @Output() onEnabled: EventEmitter<boolean> = new EventEmitter();
  @Output() onDisabled: EventEmitter<boolean> = new EventEmitter();

  @Output() onClosed: EventEmitter<any> = new EventEmitter();

  enabled = false;
  @Input() set state(id: string) {
    if (typeof this.id !== 'undefined' && this.id !== null) {
      if (this.id === id) {
        this.enabled = true;

        if (
          this.contentModal &&
          this.contentModal.config &&
          !this.contentModal.isShown
        ) {
          this.contentModal.show();
        }
      } else {
        this.enabled = false;

        if (this.contentModal && this.contentModal.isShown) {
          this.contentModal.hide();
        }
      }
    }
  }

  constructor(
    private renderer: Renderer,
    private elRef: ElementRef,
    private store$: Store<fromRoot.State>
  ) {}

  protected shouldRender(): boolean {
    return this.contentModal.isShown && this.enabled;
  }

  ngOnInit() {
    this.config = Object.assign({}, this.config, {
      autoShow: false
    });

    this.onDisabledSubscription = this.onDisabled.subscribe(event => {
      if (this.contentModal && this.contentModal.isShown) {
        this.contentModal.hide();
      }
    });
  }

  private onModalClosed(event: Event) {
    this.store$.dispatch(new layoutActions.CloseModalAction());
  }

  ngOnDestroy() {
    if (this.onDisabledSubscription) {
      this.onDisabledSubscription.unsubscribe();
    }
  }
}
