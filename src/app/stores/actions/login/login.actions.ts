import {Injectable} from '@angular/core';
import {Person} from '../../../models/person';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../reducers/reducers';
import {LoginService} from '../../../services/logins/login.service';
import {ErrorMessage} from '../../../interfaces/error-message/error-message';
import {ILogin} from '../../reducers/login/login.reducers';
import {Subscription} from 'rxjs/Subscription';
import {PushRoutesService} from '../../../services/push-route/push-routes.service';

export enum LoginActionsTypes {
  LOGIN_FETCH_START = 'LOGIN_FETCH_START',
  LOGIN_FETCH_SUCCESS = 'LOGIN_FETCH_SUCCESS',
  LOGIN_FETCH_FAILURE = 'LOGIN_FETCH_FAILURE',
}


export const LOGIN_FETCH_START = 'LOGIN_FETCH_START';
export const err: ErrorMessage = {
  code: 500,
  message: 'erreur de connexion',
  description: ' verifier vos login ou password',
  infoUrl: 'url',
};

@Injectable()
export class LoginActions {
  model: ILogin = {
    loginResults: null,
    loading: false,
    lastLogin: null,
    error: false,
    messegeError: '',
    isLogin: false,
  };

  constructor(private ngRedux: NgRedux<IAppState>, private loginService: LoginService, private pushRoutesService: PushRoutesService) {
  }

  login(login: string, pass: string): Subscription {

    return this.loginService.getPersonnesLoginPass(login, pass)
      .subscribe(
        response => this.ngRedux.dispatch(this.loginSuccess(response))
      );
  }

  public loginStart() {
    return this.ngRedux.dispatch({type: LoginActionsTypes.LOGIN_FETCH_START});
  }


  private loginSuccess(person: Person) {
    if (person == null) {
      this.pushRoutesService.pushRoute('sign-in');
      return {
        type: this.ngRedux.dispatch(this.loginFailure(err)),
        payload: null,
        error: true,
      };
    } else {
      this.loginService.setUserLoggerIn();
      this.pushRoutesService.pushRoute('dashboard/general');
      return {
        type: LoginActionsTypes.LOGIN_FETCH_SUCCESS,
        payload: person,
        error: false,
      };
    }

  }

  private loginFailure(errr: ErrorMessage) {
    return {
      type: LoginActionsTypes.LOGIN_FETCH_FAILURE,
      payload: errr,
      error: true,
    };
  }
}
