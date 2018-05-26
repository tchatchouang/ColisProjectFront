import {Injectable} from '@angular/core';
import {ofType} from 'redux-observable';
import {ProposerTrajetServices} from '../../../services/proposerTrajet/proposer-trajet-services';
import {ProposerTrajetActions, TrajetActionsTypes} from '../../actions/proposerTrajet/proposer-trajet-actions';
import {PropseTrajet} from '../../../models/propse-trajet';
import {Person} from '../../../models/person';
import {Trajet} from '../../../models/trajet';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../reducers/reducers';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProposerTrajetEpics {

  idPersonne: number;
  idTrajet: number;
  person: Person;
  trajet: Trajet;
  trajetProposer: PropseTrajet;
  poids: number;

  constructor(private ngRedux: NgRedux<IAppState>, private proposeTrajetService: ProposerTrajetServices, private proposerTrajetActions: ProposerTrajetActions) {
  }

  proposerTrajaetEpic = action$ => {
    return action$.pipe(
      ofType(TrajetActionsTypes.TRAJET_SUCESS),
      mergeMap(action$ => {
        return this.proposeTrajetService.saveProposerTrajet(
          new PropseTrajet(
            new Person(this.ngRedux.getState().login.loginResults.idPersonne),
            new Trajet(this.ngRedux.getState().proposerTrajaet.trajetResults.idTrajet),
            this.ngRedux.getState().proposerTrajaet.form.controls['poidColis'].value
          )
        ).pipe(
          map(result => this.proposerTrajetActions.proposerTrajetSuccess(result)),
          catchError(error => Observable.of(({type: this.proposerTrajetActions.proposerTrajetFailure(error)}))),
        );
      })
    );
  };

  /*
          return this.proposeTrajetService.saveProposerTrajet(this.trajetProposer)

  this.proposerServices.saveProposerTrajet(
            new PropseTrajet(new Person(this.ngRedux.getState().login.loginResults.idPersonne),
            new Trajet(this.ngRedux.getState().proposerTrajaet.trajetResults.idTrajet),
            this.ngRedux.getState.proposerTrajaet.form.controls['poidColis'].value)

            .subscribe(
            resp => {
              this.ngRedux.dispatch(this.proposerTrajetActions.proposerTrajetSuccess(resp));
            },
            errp => this.ngRedux.dispatch(this.proposerTrajetActions.proposerTrajetFailure(errp)),
          );
   */
}
