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

}
