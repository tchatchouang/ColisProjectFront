import {Person} from '../../../models/person';
import {Reducer} from 'redux';
import {actionsTypes} from '../../actions/actions.types';


export interface ILogin {
  loginResults: Person;
  loading: boolean;
  lastLogin: Date;
  error: boolean;
}

export const INITIAL_STATE: ILogin = {
  loginResults: null,
  loading: false,
  lastLogin: null,
  error: false,
};

export const loginReducer: Reducer<ILogin> =
  (lastState: ILogin = INITIAL_STATE, action): ILogin => {
    switch (action.type) {
      case actionsTypes.login.LOGIN_FETCH_START:
        return {
          ...lastState,
          loginResults: null,
          loading: true,
          error: false,
        };
      case actionsTypes.login.LOGIN_FETCH_SUCCESS:

        const res = {
          ...lastState,
          loginResults: <Person>action.payload,
          loading: false,
          lastLogin: new Date,
        };
        return res;
      case actionsTypes.login.LOGIN_FETCH_FAILURE:
        return {
          ...lastState,
          loginResults: null,
          loading: false,
          lastLogin: null,
          error: true,
        };
    }
    return lastState;
  };


