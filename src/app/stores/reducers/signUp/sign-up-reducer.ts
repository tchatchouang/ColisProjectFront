import {Reducer} from 'redux';
import {actionsTypes} from '../../actions/actions.types';


export interface ISignUp {
  isSignUp: boolean;
}

export const INITIAL_STATE: ISignUp = {
  isSignUp: false,
};

export const SignUpReducer: Reducer<ISignUp> =
  (lastState: ISignUp = INITIAL_STATE, action): ISignUp => {
    switch (action.type) {
      case actionsTypes.signUp.SIGN_UP_LOADING:
        return {
          ...lastState,
          isSignUp: false,
        };
      case actionsTypes.signUp.SIGN_UP_SUCESS:
        return {
          ...lastState,
          isSignUp: true,
        };
      case actionsTypes.signUp.SIGN_UP_FAILURE:
        return {
          ...lastState,
          isSignUp: false,
        };
      case actionsTypes.signUp.SIGN_UP_BUTTON_ONCLICK:
        return {
          ...lastState,
          isSignUp: false,
        };
    }
    return lastState;
  };


