import {Injectable} from '@angular/core';
import {IAppState} from '../../reducers/reducers';
import {NgRedux, select} from '@angular-redux/store';
import {PushRoutesService} from '../../../services/push-route/push-routes.service';
import {ErrorMessage} from '../../../interfaces/error-message/error-message';
import {FormGroup} from '@angular/forms';
import {ProposerTrajetServices} from '../../../services/proposerTrajet/proposer-trajet-services';
import {TrajetServices} from '../../../services/Trajets/trajets-services';
import {Trajet} from '../../../models/trajet';
import {PropseTrajet} from '../../../models/propse-trajet';

export enum TrajetActionsTypes {
  TRAJET_LOADING = 'TRAJET_LOADING',
  TRAJET_SUCESS = 'TRAJET_SUCESS',
  TRAJET_FAILURE = 'TRAJET_FAILURE',

}


export enum ProposerTrajetActionsTypes {
  PROPOSER_TRAJET_ONCLICK = 'PROPOSER_TRAJET_ONCLICK',
  PROPOSER_TRAJET_LOADING = 'PROPOSER_TRAJET_LOADING',
  PROPOSER_TRAJET_SUCESS = 'PROPOSER_TRAJET_SUCESS',
  PROPOSER_TRAJET_FAILURE = 'PROPOSER_TRAJET_FAILURE',
  PROPOSER_TRAJET_SAVE_FORM = 'PROPOSER_TRAJET_SAVE_FORM',

}

@Injectable()
export class ProposerTrajetActions {

  @select((state: IAppState) => state.login.loginResults.idPersonne) readonly idPersonne: number;

  constructor(private ngRedux: NgRedux<IAppState>, private pushRoutesService: PushRoutesService,
              private proposerServices: ProposerTrajetServices, private trajetServices: TrajetServices) {
  }

  public proposerTrajetOnClick(form: FormGroup) {
    this.ngRedux.dispatch({type: ProposerTrajetActionsTypes.PROPOSER_TRAJET_ONCLICK});
    this.ngRedux.dispatch({type: TrajetActionsTypes.TRAJET_LOADING});

    return this.trajetServices.saveTrajet(form)
      .subscribe(
        res => {
          this.ngRedux.dispatch(this.proposerTrajetForm(form)),
            this.ngRedux.dispatch(this.trajetSuccess(res));
        },
        err => this.ngRedux.dispatch(this.trajetFailure(err)),
      );
  }

  public trajetLoad() {
    return this.ngRedux.dispatch({type: TrajetActionsTypes.TRAJET_LOADING});
  }

  public trajetSuccess(trajet: Trajet) {
    return {
      type: TrajetActionsTypes.TRAJET_SUCESS,
      payload: trajet,
      error: false,
    };
  }

  private trajetFailure(errr: ErrorMessage) {
    return {
      type: TrajetActionsTypes.TRAJET_FAILURE,
      payload: errr,
      error: true,
    };
  }

  public proposerTrajetLoad() {
    return this.ngRedux.dispatch({type: ProposerTrajetActionsTypes.PROPOSER_TRAJET_LOADING});
  }

  public proposerTrajetSuccess(proposerTrajet: PropseTrajet) {
    this.pushRoutesService.pushRoute('/dashboard/general/trajetProposer');
    return {
      type: ProposerTrajetActionsTypes.PROPOSER_TRAJET_SUCESS,
      payload: proposerTrajet,
      error: false,
    };
  }

  public proposerTrajetFailure(errr: ErrorMessage) {
    return {
      type: ProposerTrajetActionsTypes.PROPOSER_TRAJET_FAILURE,
      payload: errr,
      error: true,
    };
  }

  public proposerTrajetForm(form: FormGroup) {
    return {
      type: ProposerTrajetActionsTypes.PROPOSER_TRAJET_SAVE_FORM,
      payload: form,
    };
  }

}
