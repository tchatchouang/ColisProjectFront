import {Reducer} from 'redux';
import {actionsTypes} from '../../actions/actions.types';
import {Conversations} from '../../../models/conversations';
import {Messages} from '../../../models/messages';


export interface IMessagerie {
  conversationResults: Conversations;
  messages: Messages[];
  loading: boolean;
  error: boolean;
  messegeError: string;
}

export const INITIAL_STATE: IMessagerie = {
  conversationResults: null,
  messages: null,
  loading: false,
  error: false,
  messegeError: '',
};

export const MessagerieReducer: Reducer<IMessagerie> =
  (lastState: IMessagerie = INITIAL_STATE, action): IMessagerie => {
    switch (action.type) {
      case actionsTypes.messagerie.MESSAGERIE_START:
        return {
          ...lastState,
          conversationResults: null,
          loading: true,
          error: false,
          messegeError: '',
        };
      case actionsTypes.messagerie.MESSAGERIE_SUCCESS:
        return {
          ...lastState,
          conversationResults: <Conversations>action.payload,
          loading: false,
        };
      case actionsTypes.messagerie.MESSAGERIE_FAILURE:
        return {
          ...lastState,
          conversationResults: null,
          loading: false,
          error: true,
          messegeError: 'Erreur de connexion',
        };
      case actionsTypes.messagerie.MESSAGERIE_READ_START:
        return {
          ...lastState,
          messages: null,
          loading: true,
          error: false,
          messegeError: '',
        };
      case actionsTypes.messagerie.MESSAGERIE_READ_SUCCESS:
        return {
          ...lastState,
          messages: <Messages[]>action.payload,
          loading: false,
        };
      case actionsTypes.messagerie.MESSAGERIE_READ_FAILURE:
        return {
          ...lastState,
          messages: null,
          loading: false,
          error: true,
          messegeError: 'Erreur de connexion',
        };
      case actionsTypes.messagerie.MESSAGERIE_SEND_MESSAGE:
        return {
          ...lastState,
          messages: <Messages[]>action.payload,
          loading: false,
        };
    }
    return lastState;
  };


