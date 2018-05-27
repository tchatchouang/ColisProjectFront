import {Reducer} from 'redux';
import {actionsTypes} from '../../actions/actions.types';
import {Trajet} from '../../../models/trajet';


export interface ITrajetPublier {
  trajetResults: Trajet[];
  loading: boolean;
  error: boolean;
  messegeError: string;
}

export const INITIAL_STATE: ITrajetPublier = {
  trajetResults: null,
  loading: false,
  error: false,
  messegeError: '',
};

export const TrajetPublierReducer: Reducer<ITrajetPublier> =
  (lastState: ITrajetPublier = INITIAL_STATE, action): ITrajetPublier => {
    switch (action.type) {
      case actionsTypes.trajetPublier.TRAJET_PUBLIER_SUCESS:
        return {
          ...lastState,
          trajetResults: <Trajet[]>action.payload,
          loading: false,
        };
      case actionsTypes.trajetPublier.TRAJET_PUBLIER_FAILURE:
        return {
          ...lastState,
          trajetResults: null,
          loading: false,
          error: true,
          messegeError: 'Erreur de connexion',
        };
    }
    return lastState;
  };


