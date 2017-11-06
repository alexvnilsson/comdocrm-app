import { Component, OnInit, HostBinding, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ccrm-ui-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  animations: [
    trigger('spinnerContainerTransition', [
      transition(':leave', [
        animate('0s 500ms', style({ display: 'none' }))
      ])
    ]),
    trigger('spinnerTransition', [
      transition('active => inactive', [
        animate('500ms', keyframes([
          style({ transform: 'scale(1.0)', offset: 0 }),
          style({ transform: 'scale(0)', offset: 1 })
        ]))
      ])
    ])
  ],
  host: {
    '[@spinnerContainerTransition]': 'true',
    '(@spinnerContainerTransition.start)': 'onTransitionStarted($event)',
    '(@spinnerContainerTransition.done)': 'onTransitionDone($event)'
  }
})
export class SpinnerComponent implements OnInit, OnDestroy {
  @Input() type: string = 'dots';

  @HostBinding('class.active') isActive: boolean = true;
  @HostBinding('class.leaving') isLeaving: boolean = false;

  state = 'active';

  @Output('done') onLoadingDone = new EventEmitter<boolean>();

  private routeEventListener: Subscription;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

  protected isType(type: string): boolean {
    return this.type === type;
  }

  onTransitionStarted(event: any) {
    if (event.toState == 'void') {
      this.isActive = false;
      this.isLeaving = true;
      this.state = 'inactive';
    }
  }

  onTransitionDone(event: any) {
    if (event.toState == 'void') {

    }
  }

  ngOnDestroy() {
    if (this.routeEventListener)
      this.routeEventListener.unsubscribe();
  }
}
