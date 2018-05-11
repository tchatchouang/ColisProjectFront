import {HttpClient, HttpHandler} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {map} from 'rxjs/operators';
import {HttpLoaderEmitter} from './emitter/http.loader.emitter';

@Injectable()
export class HttpService extends HttpClient {
  public pendingRequests = 0;
  public blockingRequests = 0;
  private emitter: HttpLoaderEmitter;

  constructor(private httpHandler: HttpHandler, private injector: Injector) {
    super(httpHandler);
    this.emitter = injector.get(HttpLoaderEmitter);
  }

  private onRequest(blockUI: boolean = true): void {
    if (blockUI) {
      this.blockingRequests++;
    }
    this.pendingRequests++;
    this.emitter.emit({
      action: 'start',
      count: this.pendingRequests,
    });
  }

  onRequestEnd(blockUI: boolean = true): void {
    if (blockUI) {
      this.blockingRequests--;
    }
    this.pendingRequests--;
    this.emitter.emit({
      action: 'end',
      count: this.pendingRequests,
    });
  }

  onError(err): void {
    this.emitter.emit({
      action: 'error',
      error: err,
    });
  }


  get<T>(url: string, options?): Observable<T> {
    const blockUI = !options || options.blockUI === undefined || options.blockUI;

    return Observable.create((observer: Observer<T>) => {
      this.onRequest(blockUI);
      this.handle(observer, super.get<T>(url, options), options);
    });
  }

  post<T>(url: string, body?: any, options?): Observable<T> {
    const blockUI = !options || options.blockUI === undefined || options.blockUI;
    return Observable.create((observer: Observer<T>) => {
      this.onRequest(blockUI);
      this.handle(observer, super.post<T>(url, body, options), options);
    });
  }

  put<T>(url: string, body: any, options?): Observable<T> {
    const blockUI = !options || options.blockUI === undefined || options.blockUI;
    return Observable.create((observer: Observer<T>) => {
      this.onRequest(blockUI);
      this.handle(observer, super.put<T>(url, body, options), options);
    });
  }

  del<T>(url: string, options?): Observable<T> {
    const blockUI = !options || options.blockUI === undefined || options.blockUI;
    return Observable.create((observer: Observer<T>) => {
      this.onRequest(blockUI);
      this.handle(observer, super.delete<T>(url, options), options);
    });
  }

  handle<T>(observer: Observer<T>, o: Observable<any>, options?) {
    const blockUI = !options || options.blockUI === undefined || options.blockUI;

    const subscribe = o.pipe(
      map(res => {
        this.onRequestEnd(blockUI);
        return res;
      }))
      .subscribe(
        res => {
          subscribe.unsubscribe();
          observer.next(res);
          observer.complete();
        },
        err => {
          this.onRequestEnd(blockUI);
          this.onError(err);
          subscribe.unsubscribe();
          observer.error(err);
        });

  }
}

export function httpServiceFactory(httpHandler: HttpHandler, injector: Injector) {
  return new HttpService(httpHandler, injector);
}
