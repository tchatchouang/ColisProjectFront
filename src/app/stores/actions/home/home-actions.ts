import {Injectable} from '@angular/core';
import {IAppState} from '../../reducers/reducers';
import {NgRedux} from '@angular-redux/store';
import {ErrorMessage} from '../../../interfaces/error-message/error-message';
import {Trajet} from '../../../models/trajet';
import {Subscription} from 'rxjs/Subscription';
import {TrajetServices} from '../../../services/Trajets/trajets-services';
import {PersonnesService} from '../../../services/personne/personnes.service';
import {Person} from '../../../models/person';


export enum HomeActionsTypes {
  HOME_PAGE_LOAD = 'HOME_PAGE_LOAD',
  HOME_ALL_TRAJET_PUBLIER_SUCESS = 'HOME_ALL_TRAJET_PUBLIER_SUCESS',
  HOME_TRAJET_PUBLIER_FAILURE = 'HOME_TRAJET_PUBLIER_FAILURE',
  HOME_ALL_PERS_TRAJET_PUBLIER_SUCESS = 'HOME_ALL_PERS_TRAJET_PUBLIER_SUCESS',
  HOME_PERS_TRAJET_PUBLIER_FAILURE = 'HOME_PERS_TRAJET_PUBLIER_FAILURE',
}

@Injectable()
export class HomeActions {
  arr: Person[] = new Array();

  constructor(private ngRedux: NgRedux<IAppState>, private trajetServices: TrajetServices, private personneServices: PersonnesService) {
  }

  public home(lieuDepart: string, lieuArriver: string, page: number, size: number): Subscription {
    this.homeTrajetLoad();
    return this.trajetServices.dosearch(lieuDepart, lieuArriver, page, size)
      .subscribe(
        response => this.ngRedux.dispatch(this.homeTrajetSuccess(response)),
        err => this.ngRedux.dispatch(this.homeTrajetFailure(err)),
      );
  }

  private homeTrajetSuccess(trajet: Trajet[]) {
    return {
      type: HomeActionsTypes.HOME_ALL_TRAJET_PUBLIER_SUCESS,
      payload: trajet /*.sort((left, right) => { if (right.dateDepart > left.dateDepart) { return 1; }})*/,
      error: false,
    };
  }

  public homeTrajetFailure(errr: ErrorMessage) {
    return {
      type: HomeActionsTypes.HOME_TRAJET_PUBLIER_FAILURE,
      payload: errr,
      error: true,
    };
  }

  public homePersTrajetSuccess(person: Person[]) {
    return {
      type: HomeActionsTypes.HOME_ALL_PERS_TRAJET_PUBLIER_SUCESS,
      payload: person,
      error: false,
    };
  }

  public homePersTrajetFailure(errr: ErrorMessage) {
    return {
      type: HomeActionsTypes.HOME_PERS_TRAJET_PUBLIER_FAILURE,
      payload: errr,
      error: true,
    };
  }

  public homeTrajetLoad() {
    return this.ngRedux.dispatch({type: HomeActionsTypes.HOME_PAGE_LOAD});
  }

  public getPersonneTrajet(tabIdTrajet: number[]): Person[] {
    let j: number;
    const arrPersone: Person[] = new Array();
    for (j = 0; j < tabIdTrajet.length; j++) {
      this.personneServices.getPersonneTrajet(tabIdTrajet[j].toString()).subscribe(data => {
        arrPersone.push(data);
      });
    }
    this.ngRedux.dispatch(this.homePersTrajetSuccess(arrPersone));
    return arrPersone;
  }
}


// let listPersonOut: Observable<Person>;

/*
 for (j = 0; j < tabIdTrajet.length ; j++) {
  this.personneServices.getPersonneTrajet(tabIdTrajet[j].toString()).subscribe(
    response => this.ngRedux.dispatch(this.homePersTrajetSuccess(response)),
    err => this.ngRedux.dispatch(this.homePersTrajetFailure(err)),
  );
}
 */

/*console.log('listPersonOut');
listPersonOut.forEach(function (value) {
  this.tt = value.idPersonne;
  console.log(value);
});*/

// console.log(listPersonOut);

/*public findPersonneTrajet( idTrajet: string): Subscription {
   return this.personneServices.getPersonneTrajet(idTrajet)
     .subscribe(
       response => this.ngRedux.dispatch(this.homePersTrajetSuccess(response)),
       err => this.ngRedux.dispatch(this.homePersTrajetFailure(err)),
     );
 }*/
