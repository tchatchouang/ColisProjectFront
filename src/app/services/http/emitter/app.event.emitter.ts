import {EventEmitter} from '@angular/core';

export abstract class AppEventEmitter {
  private emitter: EventEmitter<any>;

  constructor() {
    this.emitter = new EventEmitter<any>();
  }

  getEmitter(): EventEmitter<any> {
    return this.emitter;
  }

  emit(data: any): void {
    this.emitter.emit(data);
  }
}
