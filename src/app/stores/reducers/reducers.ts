import {combineReducers} from 'redux';
import {ILogin, loginReducer} from './login/login.reducers';
import {composeReducers, defaultFormReducer} from '@angular-redux/form';
import {ISignOut, SignOutReducer} from './signOut/sign-out-reducers';
import {ISignUp, SignUpReducer} from './signUp/sign-up-reducer';
import {IProposerTrajet, ProposerTrajetReducer} from './publierTrajet/publier-trajet-reducer';


export interface IAppState {
  login?: ILogin;
  signOut?: ISignOut;
  signUp?: ISignUp;
  proposerTrajaet?: IProposerTrajet;
}

export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    login: loginReducer,
    signOut: SignOutReducer,
    signUp: SignUpReducer,
    proposerTrajaet: ProposerTrajetReducer,
  }));

