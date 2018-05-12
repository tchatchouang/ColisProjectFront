import {Injectable} from '@angular/core';
import {LoginActionsTypes} from '../../actions/login/login.actions';
import {SignOutActionsTypes} from '../../actions/signOut/sign-out-actions';
import {Observable} from 'rxjs/Observable';
import {mapTo} from 'rxjs/operator/mapTo';
import {ofType} from 'redux-observable';

@Injectable()
export class LoginEpics {

  baseUrl: string;
  á;

  constructor() {
  }

}
