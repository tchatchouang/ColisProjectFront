import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../reducers/reducers';
import {ErrorMessage} from '../../../interfaces/error-message/error-message';
import {Subscription} from 'rxjs/Subscription';
import {PushRoutesService} from '../../../services/push-route/push-routes.service';
import {MessagerietsServices} from '../../../services/messagerie/messageriets-services';
import {Conversations} from '../../../models/conversations';
import {Messages} from '../../../models/messages';
import {Person} from '../../../models/person';
import {LoginService} from '../../../services/logins/login.service';

export enum MessagerieActionsTypes {
  MESSAGERIE_START = 'MESSAGERIE_START',
  MESSAGERIE_SUCCESS = 'MESSAGERIE_SUCCESS',
  MESSAGERIE_FAILURE = 'MESSAGERIE_FAILURE',
  MESSAGERIE_READ_START = 'MESSAGERIE_READ_START',
  MESSAGERIE_READ_SUCCESS = 'MESSAGERIE_READ_SUCCESS',
  MESSAGERIE_READ_FAILURE = 'MESSAGERIE_READ_FAILURE',
  MESSAGERIE_SEND_MESSAGE = 'MESSAGERIE_SEND_MESSAGE',
}

export const err: ErrorMessage = {
  code: 500,
  message: 'erreur de connexion',
  description: ' verifier vos login ou password',
  infoUrl: 'url',
};

@Injectable()
export class MessagerieActions {
  convers: Conversations;
  per: Person;

  constructor(private ngRedux: NgRedux<IAppState>, private pushRoutesService: PushRoutesService,
              private messagerieServices: MessagerietsServices, private loginService: LoginService) {
  }

  messagerie(): Subscription {
    this.messagerieStart();
    return this.messagerieServices.getConversations(this.ngRedux.getState().login.loginResults.idPersonne.toString())
      .subscribe(
        response => this.ngRedux.dispatch(this.messagerieSuccess(response)),
        err => this.ngRedux.dispatch(this.messagerieFailure(err)),
      );
  }

  public messagerieStart() {
    return this.ngRedux.dispatch({type: MessagerieActionsTypes.MESSAGERIE_START});
  }


  private messagerieSuccess(conversation: Conversations) {
    return {
      type: MessagerieActionsTypes.MESSAGERIE_SUCCESS,
      payload: conversation,
      error: false,
    };
  }

  private messagerieFailure(errr: ErrorMessage) {
    return {
      type: MessagerieActionsTypes.MESSAGERIE_FAILURE,
      payload: errr,
      error: true,
    };
  }

  messages(idConversation: string): Subscription {
    this.messagerieReadStart();
    return this.messagerieServices.getlistMessageFromConversation(idConversation)
      .subscribe(
        response => this.ngRedux.dispatch(this.messagerieReadSuccess(response)),
        err => this.ngRedux.dispatch(this.messagerieReadFailure(err)),
      );
  }

  public messagerieReadStart() {
    this.ngRedux.dispatch({type: MessagerieActionsTypes.MESSAGERIE_READ_START});
  }

  public messagerieReadSuccess(message: Messages[]) {
    return {
      type: MessagerieActionsTypes.MESSAGERIE_READ_SUCCESS,
      payload: message,
      error: false,
    };
  }

  private messagerieReadFailure(errr: ErrorMessage) {
    return {
      type: MessagerieActionsTypes.MESSAGERIE_READ_FAILURE,
      payload: errr,
      error: true,
    };
  }

  sendMessage(cotenueMessage: string, dateEnvoie: Date, idConversation: number, idPersonne: number) {
    this.messagerieServices.saveMessage(cotenueMessage, new Date(), idConversation, idPersonne)
      .subscribe(
        response => this.messagerieServices.sendMessage(cotenueMessage),
        err => this.ngRedux.dispatch(this.messagerieReadFailure(err)),
      );


  }

  public messagerieSendMessageSuccess() {
    return {
      type: MessagerieActionsTypes.MESSAGERIE_SEND_MESSAGE,
      payload: 'message send ',
      error: false,
    };
  }
}
