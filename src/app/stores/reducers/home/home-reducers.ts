import {Reducer} from 'redux';
import {actionsTypes} from '../../actions/actions.types';
import {Trajet} from '../../../models/trajet';
import {Person} from '../../../models/person';


export interface IHome {
  trajetResults: Trajet[];
  personeResults: Person[];
  loading: boolean;
  error: boolean;
  messegeError: string;
  totalPages: Array<number>;
}

export const INITIAL_STATE: IHome = {
  trajetResults: null,
  personeResults: null,
  loading: false,
  error: false,
  messegeError: '',
  totalPages: null,
};

export const HomeReducer: Reducer<IHome> =
  (lastState: IHome = INITIAL_STATE, action): IHome => {
    switch (action.type) {
      case actionsTypes.home.HOME_PAGE_LOAD:
        return {
          ...lastState,
          trajetResults: null,
          personeResults: null,
          loading: true,
        };
      case actionsTypes.home.HOME_ALL_TRAJET_PUBLIER_SUCESS:
        return {
          ...lastState,
          trajetResults: <Trajet[]>action.payload,
          loading: false,
          totalPages: new Array(action.payload.totalPages),
        };
      case actionsTypes.home.HOME_TRAJET_PUBLIER_FAILURE:
        return {
          ...lastState,
          trajetResults: null,
          loading: false,
          error: true,
          messegeError: 'Erreur de connexion',
        };
      case actionsTypes.home.HOME_ALL_PERS_TRAJET_PUBLIER_SUCESS:
        return {
          ...lastState,
          personeResults: <Person[]>action.payload,
          loading: false,
        };
      case actionsTypes.home.HOME_PERS_TRAJET_PUBLIER_FAILURE:
        return {
          ...lastState,
          personeResults: null,
          loading: false,
          error: true,
          messegeError: 'Erreur de connexion',
        };
    }
    return lastState;
  };


