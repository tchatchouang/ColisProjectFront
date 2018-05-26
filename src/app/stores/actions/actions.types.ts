import {LoginActionsTypes} from './login/login.actions';
import {SignOutActionsTypes} from './signOut/sign-out-actions';
import {SignUpActionsTypes} from './singUp/sign-up-actions';
import {ProposerTrajetActionsTypes, TrajetActionsTypes} from './proposerTrajet/proposer-trajet-actions';

export const actionsTypes = {
  login: LoginActionsTypes,
  signOut: SignOutActionsTypes,
  signUp: SignUpActionsTypes,
  trajet: TrajetActionsTypes,
  proposerTrajet: ProposerTrajetActionsTypes,
};

