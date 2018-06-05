import {LoginActionsTypes} from './login/login.actions';
import {SignOutActionsTypes} from './signOut/sign-out-actions';
import {SignUpActionsTypes} from './singUp/sign-up-actions';
import {ProposerTrajetActionsTypes, TrajetActionsTypes} from './proposerTrajet/proposer-trajet-actions';
import {TrajetPublierActionsTypes} from './trajetPublier/trajet-publier-actions';
import {MessagerieActionsTypes} from './messagerie/messagerie.actions';

export const actionsTypes = {
  login: LoginActionsTypes,
  signOut: SignOutActionsTypes,
  signUp: SignUpActionsTypes,
  trajet: TrajetActionsTypes,
  proposerTrajet: ProposerTrajetActionsTypes,
  trajetPublier: TrajetPublierActionsTypes,
  messagerie: MessagerieActionsTypes,
};

