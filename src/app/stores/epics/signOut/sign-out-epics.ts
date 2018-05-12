import {Injectable} from '@angular/core';
import {LoginActionsTypes} from '../../actions/login/login.actions';
import {Observable} from 'rxjs/Observable';
import {ofType} from 'redux-observable';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {catchError} from 'rxjs/operators';
import {SignOutActionsTypes} from '../../actions/signOut/sign-out-actions';
import {PushRoutesService} from '../../../services/push-route/push-routes.service';
import {actionsTypes} from '../../actions/actions.types';
import {SignOutService} from '../../../services/singOut/sign-out-service';
import {mapTo} from 'rxjs/operator/mapTo';

@Injectable()
export class SignOutEpics {

  baseUrl: string;
  á;

  constructor(private  signOutService: SignOutService) {
  }

}

