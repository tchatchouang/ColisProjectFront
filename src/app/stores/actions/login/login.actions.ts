import {Injectable} from '@angular/core';
import {Person} from '../../../models/person';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../reducers/reducers';
import {LoginService} from '../../../services/logins/login.service';
import {ErrorMessage} from '../../../interfaces/error-message/error-message';
import {ILogin} from '../../reducers/login/login.reducers';

export enum LoginActionsTypes {
  LOGIN_FETCH_START = 'LOGIN_FETCH_START',
  LOGIN_FETCH_SUCCESS = 'LOGIN_FETCH_SUCCESS',
  LOGIN_FETCH_FAILURE = 'LOGIN_FETCH_FAILURE',
}


export const LOGIN_FETCH_START = 'LOGIN_FETCH_START';

@Injectable()
export class LoginActions {
  model: ILogin = {
    loginResults: null,
    loading: false,
    lastLogin: null,
    error: false,
  };

  constructor(private ngRedux: NgRedux<IAppState>, private loginService: LoginService) {
  }

  login(login: string, pass: string) {

    this.ngRedux.dispatch(this.loginStart());

  }

  private loginStart() {
    return {
      type: LoginActionsTypes.LOGIN_FETCH_START,
    };
  }


  private loginSuccess(person: Person) {
    return {
      type: LoginActionsTypes.LOGIN_FETCH_SUCCESS,
      payload: person,
    };
  }

  private loginFailure(err: ErrorMessage) {
    return {
      type: LoginActionsTypes.LOGIN_FETCH_FAILURE,
      payload: err,
      error: true,
    };
  }
}
