import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {LoginService} from './logins/login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpModule,
  ],
  declarations: [],
  providers: [
    LoginService,
  ],
})
export class ServiceModule {
  constructor() {
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [],
    };
  }
}
