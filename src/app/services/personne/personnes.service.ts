import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Person} from '../../models/person';

@Injectable()
export class PersonnesService {

  constructor(public http: HttpClient) {
  }

  getPersonneTrajet(idTrajet: string) {
    return this.http.get<Person>('http://localhost:8080/infoperstra', {
      params: new HttpParams()
        .set('idTrajet', idTrajet),
    });
  }

}
