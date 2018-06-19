import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Trajet} from '../../models/trajet';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {FormGroup} from '@angular/forms';

@Injectable()
export class TrajetServices {

  constructor(public http: HttpClient) {
  }

  saveTrajet(form: FormGroup): Observable<Trajet> {
    return this.http.post<Trajet>('http://localhost:8080/trajet', form.value);
  }

  getTrajetList(idPersonne: string): Observable<Trajet[]> {
    return this.http.get<Trajet[]>('http://localhost:8080/personnes/Trajet/list', {
      params: new HttpParams()
        .set('idPersonne', idPersonne),
    });
  }

  dosearch(lieuDepart: string, lieuArriver: string, page: number, size: number): Observable<Trajet[]> { //dateDepart: Date, dateArriver: Date
    //.set('dateDepart', dateDepart.toString())
    //.set('dateArriver', dateArriver.toString())

    /*return this.http.get<Trajet[]>('http://localhost:8080/dosearche?lieuArriver=' + lieuArriver)
      .map(response => response);*/
    return this.http.get<Trajet[]>('http://localhost:8080/dosearche', {
      params: new HttpParams()
        .set('lieuDepart', lieuDepart)
        .set('lieuArriver', lieuArriver)
        .set('page', page.toString())
        .set('size', size.toString()),
    });
  }

}
