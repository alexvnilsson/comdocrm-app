import { Directive, EventEmitter } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[modalWrapper]'
})
export class ModalWrapperDirective {
  protected onModalRendered: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  public modalShown() {
    this.onModalRendered.emit(true);
  }

  public modalHidden() {
    this.onModalRendered.emit(false);
  }
}
