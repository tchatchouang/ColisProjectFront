import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PropseTrajet} from '../../models/propse-trajet';

@Injectable()
export class ProposerTrajetServices {

  constructor(public http: HttpClient) {
  }

  saveProposerTrajet(propseTrajet: PropseTrajet): Observable<PropseTrajet> {
    return this.http.post<PropseTrajet>('http://localhost:8080/personnes/saveTrajetProposer', propseTrajet);
  }
}

