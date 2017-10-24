import { EventEmitter } from '@angular/core';

export class ComposeLog {
  Open = false;

  public open() {
    this.Open = true;
  }

  public close() {
    this.Open = false;
  }
}
