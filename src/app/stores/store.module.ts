import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import {NgModule} from '@angular/core';
import {createLogger} from 'redux-logger';
import {LoginActions} from './actions/login/login.actions';
import {NgReduxFormModule} from '@angular-redux/form';
import {IAppState, rootReducer} from './reducers/reducers';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    NgReduxModule,
    NgReduxFormModule,
  ],
  providers: [
    LoginActions,
  ],
})
export class StoreModule {
  constructor(public ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {

    const storeEnhancers = devTools.isEnabled() ?
      [devTools.enhancer()] :
      [];
    const middlewares = [
      createLogger(),
    ];

    this.ngRedux.configureStore(rootReducer, {}, middlewares, storeEnhancers);

    // Enable syncing of Angular form state with our Redux store.
    // provideReduxForms(ngRedux);
  }
}
