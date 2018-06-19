import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {LoginService} from './logins/login.service';
import {NgReduxFormModule} from '@angular-redux/form';
import {HttpClientModule} from '@angular/common/http';
import {PushRoutesService} from './push-route/push-routes.service';
import {SignOutService} from './singOut/sign-out-service';
import {SignUpServices} from './signUp/sign-up-services';
import {TrajetServices} from './Trajets/trajets-services';
import {ProposerTrajetServices} from './proposerTrajet/proposer-trajet-services';
import {MessagerietsServices} from './messagerie/messageriets-services';
import {PersonnesService} from './personne/personnes.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    NgReduxFormModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [
    LoginService,
    PushRoutesService,
    SignOutService,
    SignUpServices,
    TrajetServices,
    ProposerTrajetServices,
    TrajetServices,
    MessagerietsServices,
    PersonnesService
  ],
})
export class ServiceModule {
  constructor(@Optional() @SkipSelf() parentModule: ServiceModule) {
    if (parentModule) {
      throw new Error(
        'ServiceModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [],
    };
  }
}
