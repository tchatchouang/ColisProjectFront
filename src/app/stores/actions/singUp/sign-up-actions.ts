import {Injectable} from '@angular/core';
import {IAppState} from '../../reducers/reducers';
import {NgRedux} from '@angular-redux/store';
import {PushRoutesService} from '../../../services/push-route/push-routes.service';
import {ISignUp} from '../../reducers/signUp/sign-up-reducer';
import {ErrorMessage} from '../../../interfaces/error-message/error-message';
import {FormGroup} from '@angular/forms';
import {SignUpServices} from '../../../services/signUp/sign-up-services';
import {LoginService} from '../../../services/logins/login.service';


export enum SignUpActionsTypes {
  SIGN_UP_LOADING = 'SIGN_UP_LOADING',
  SIGN_UP_SUCESS = 'SIGN_UP_SUCESS',
  SIGN_UP_FAILURE = 'SIGN_UP_FAILURE',
  SIGN_UP_BUTTON_ONCLICK = 'SIGN_UP_BUTTON_ONCLICK',

}

@Injectable()
export class SignUpActions {
  model: ISignUp = {
    isSignUp: false,
  };

  constructor(private ngRedux: NgRedux<IAppState>, private pushRoutesService: PushRoutesService,
              private signUpServices: SignUpServices, private loginService: LoginService) {
  }

  public signUpOnClickButton(form: FormGroup) {
    this.ngRedux.dispatch({type: SignUpActionsTypes.SIGN_UP_BUTTON_ONCLICK});
    return this.signUpServices.signUp(form)
      .subscribe(
        res => {
          this.ngRedux.dispatch(this.signUpSuccess(res)),
            form.reset();
        },
        err => this.ngRedux.dispatch(this.signUpFailure(err)),
      );
  }

  public signUp() {
    this.pushRoutesService.pushRoute('home');
    return {
      type: this.ngRedux.dispatch({type: SignUpActionsTypes.SIGN_UP_LOADING}),
      payload: null,
      error: false,
    };

  }

  public signUpLoad() {
    this.pushRoutesService.pushRoute('sign-up');
    return this.ngRedux.dispatch({type: SignUpActionsTypes.SIGN_UP_LOADING});
  }

  private signUpSuccess(form: FormGroup) {
    this.pushRoutesService.pushRoute('/sign-in');
    return {
      type: SignUpActionsTypes.SIGN_UP_SUCESS,
      payload: form,
      error: false,
    };

  }

  private signUpFailure(errr: ErrorMessage) {
    return {
      type: SignUpActionsTypes.SIGN_UP_FAILURE,
      payload: errr,
      error: true,
    };
  }

}
