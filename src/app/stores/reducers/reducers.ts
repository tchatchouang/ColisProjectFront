import {combineReducers} from 'redux';
import {ILogin, loginReducer} from './login/login.reducers';
import {composeReducers, defaultFormReducer} from '@angular-redux/form';
import {ISignOut, SignOutReducer} from './signOut/sign-out-reducers';


export interface IAppState {
  login?: ILogin;
  signOut?: ISignOut;
}

export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    login: loginReducer,
    signOut: SignOutReducer,
  }));

