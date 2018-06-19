import {Injectable} from '@angular/core';
import {ActionsObservable, ofType} from 'redux-observable';
import {PropseTrajet} from '../../../models/propse-trajet';
import {Person} from '../../../models/person';
import {Trajet} from '../../../models/trajet';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../reducers/reducers';
import {mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {HomeActions, HomeActionsTypes} from '../../actions/home/home-actions';
import {PersonnesService} from '../../../services/personne/personnes.service';

@Injectable()
export class HomeEpics {

  idPersonne: number;
  idTrajet: number;
  person: Person;
  trajet: Trajet;
  trajetProposer: PropseTrajet;

  constructor(private ngRedux: NgRedux<IAppState>, private personneServices: PersonnesService, private homeActions: HomeActions) {
  }

  public fetchPersonEpic = (action$: ActionsObservable<any>): Observable<any> => {
    return action$.pipe(
      ofType(HomeActionsTypes.HOME_ALL_TRAJET_PUBLIER_SUCESS),
      mergeMap((action) => {
        let j: number;
        const arr_names: number[] = new Array();
        for (j = 0; j < action.payload.content.length; j++) {
          arr_names[j] = action.payload.content[j].idTrajet;
        }
        return this.homeActions.getPersonneTrajet(arr_names);
      }),
    );
  };


}

