import {Injectable} from '@angular/core';
import {IAppState} from '../../reducers/reducers';
import {NgRedux} from '@angular-redux/store';
import {ErrorMessage} from '../../../interfaces/error-message/error-message';
import {Trajet} from '../../../models/trajet';
import {Subscription} from 'rxjs/Subscription';
import {TrajetServices} from '../../../services/Trajets/trajets-services';


export enum TrajetPublierActionsTypes {
  TRAJET_PUBLIER_SUCESS = 'TRAJET_PUBLIER_SUCESS',
  TRAJET_PUBLIER_FAILURE = 'TRAJET_PUBLIER_FAILURE',

}

@Injectable()
export class TrajetPublierActions {

  constructor(private ngRedux: NgRedux<IAppState>, private trajetServices: TrajetServices) {
  }

  public trajetPublier(): Subscription {
    return this.trajetServices.getTrajetList(this.ngRedux.getState().login.loginResults.idPersonne.toString())
      .subscribe(
        response => this.ngRedux.dispatch(this.trajetProposerSuccess(response)),
        err => this.ngRedux.dispatch(this.trajetProposerFailure(err)),
      );
  }

  private trajetProposerSuccess(trajet: Trajet[]) {
    return {
      type: TrajetPublierActionsTypes.TRAJET_PUBLIER_SUCESS,
      payload: trajet,
      error: false,
    };

  }

  private trajetProposerFailure(errr: ErrorMessage) {
    return {
      type: TrajetPublierActionsTypes.TRAJET_PUBLIER_FAILURE,
      payload: errr,
      error: true,
    };
  }

}
