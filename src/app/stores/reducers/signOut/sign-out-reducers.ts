import {Reducer} from 'redux';
import {actionsTypes} from '../../actions/actions.types';


export interface ISignOut {
  lastSignOut: Date;
  isSignOut: boolean;
}

export const INITIAL_STATE: ISignOut = {
  lastSignOut: null,
  isSignOut: false,
};

export const SignOutReducer: Reducer<ISignOut> =
  (lastState: ISignOut = INITIAL_STATE, action): ISignOut => {
    switch (action.type) {
      case actionsTypes.signOut.SIGN_OUT_SUCESS:
        const res = {
          ...lastState,
          lastSignOut: new Date,
          isSignOut: true,
        };
        return res;
      case actionsTypes.signOut.SIGN_OUT_FAILURE:
        return {
          ...lastState,
          lastSignOut: null,
          isSignOut: false,
        };
    }
    return lastState;
  };


