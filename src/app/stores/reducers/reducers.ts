import {combineReducers} from 'redux';
import {ILogin, loginReducer} from './login/login.reducers';
import {composeReducers, defaultFormReducer, NgReduxFormModule} from '@angular-redux/form';


export interface IAppState {
  login?: ILogin;
}

export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    login: loginReducer,
  }));

