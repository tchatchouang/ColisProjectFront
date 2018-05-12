import {Injectable} from '@angular/core';
import {IAppState} from '../../reducers/reducers';
import {NgRedux} from '@angular-redux/store';
import {PushRoutesService} from '../../../services/push-route/push-routes.service';
import {ISignOut} from '../../reducers/signOut/sign-out-reducers';
import {LoginService} from '../../../services/logins/login.service';
import {LoginActions} from '../login/login.actions';


export enum SignOutActionsTypes {
  SIGN_OUT_SUCESS = 'SIGN_OUT_SUCESS',
  SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE',
}

@Injectable()
export class SignOutActions {
  model: ISignOut = {
    lastSignOut: null,
    isSignOut: false,
  };

  constructor(private ngRedux: NgRedux<IAppState>, private pushRoutesService: PushRoutesService, private loginService: LoginService, private loginActions: LoginActions) {
  }


  public signOut() {
    this.loginService.setUserLoggerOut();
    this.loginActions.loginStart();
    this.pushRoutesService.pushRoute('home');
    return {
      type: this.ngRedux.dispatch({type: SignOutActionsTypes.SIGN_OUT_SUCESS}),
      payload: null,
      error: false,
    };

  }

}
