import {Reducer} from 'redux';
import {actionsTypes} from '../../actions/actions.types';
import {Trajet} from '../../../models/trajet';
import {PropseTrajet} from '../../../models/propse-trajet';
import {FormGroup} from '@angular/forms';


export interface IProposerTrajet {
  trajetResults: Trajet;
  trajetPropserResults: PropseTrajet;
  loading: boolean;
  loadingTrajet: boolean;
  send: boolean;
  error: boolean;
  form: FormGroup;
}

export const INITIAL_STATE: IProposerTrajet = {
  trajetResults: null,
  trajetPropserResults: null,
  loading: false,
  loadingTrajet: false,
  send: false,
  error: false,
  form: null,
};

export const ProposerTrajetReducer: Reducer<IProposerTrajet> =
  (lastState: IProposerTrajet = INITIAL_STATE, action): IProposerTrajet => {
    switch (action.type) {
      case actionsTypes.trajet.TRAJET_LOADING:
        return {
          ...lastState,
          trajetResults: null,
          trajetPropserResults: null,
          loadingTrajet: true,
        };
      case actionsTypes.trajet.TRAJET_SUCESS:
        return {
          ...lastState,
          trajetResults: <Trajet>action.payload,
          loadingTrajet: false,
        };
      case actionsTypes.trajet.TRAJET_FAILURE:
        return {
          ...lastState,
          trajetResults: null,
          trajetPropserResults: null,
          loading: false,
          loadingTrajet: false,
          error: true,
        };

      case actionsTypes.proposerTrajet.PROPOSER_TRAJET_LOADING:
        return {
          ...lastState,
          trajetResults: null,
          trajetPropserResults: null,
          loading: true,
          error: false,
        };
      case actionsTypes.proposerTrajet.PROPOSER_TRAJET_ONCLICK:
        return {
          ...lastState,
          trajetResults: null,
          trajetPropserResults: null,
          loading: true,
          send: true,
          error: false,
        };
      case actionsTypes.proposerTrajet.PROPOSER_TRAJET_SUCESS:
        return {
          ...lastState,
          trajetResults: <Trajet>action.payload,
          trajetPropserResults: <PropseTrajet>action.payload,
          loading: false,
          send: false,
        };
      case actionsTypes.proposerTrajet.PROPOSER_TRAJET_SAVE_FORM:
        return {
          ...lastState,
          form: <FormGroup>action.payload,
          send: true,
        };
      case actionsTypes.proposerTrajet.PROPOSER_TRAJET_FAILURE:
        return {
          ...lastState,
          trajetResults: null,
          trajetPropserResults: null,
          loading: false,
          send: false,
          error: true,
        };
    }
    return lastState;
  };


