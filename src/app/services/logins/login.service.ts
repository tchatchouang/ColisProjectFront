import {Injectable} from '@angular/core';
import {Person} from '../../models/person';
import {Observable} from 'rxjs/Observable';
import {HttpParams} from '@angular/common/http';
import {HttpService} from '../http/http.service';

@Injectable()
export class LoginService {

  private isUserLoggerIn;
  private userName;
  private baseUrl;

  constructor() {
    this.baseUrl = 'http://localhost:8080/';
  }

  saveDonneur(person: Person) {
    this.isUserLoggerIn = false;
  }

  setUserLoggerIn() {
    this.isUserLoggerIn = true;
  }


  getUserLoggerIn() {
    return this.isUserLoggerIn;
  }

  /*getPersonnesLoginPass(loginPersonne: string, passwordPersonne: string): Observable<Person> {
    return this.http.get(`${this.baseUrl}/personnes/checkLoginPass?loginPersonne`, {
      params: new HttpParams()
        .set('loginPersonne', loginPersonne)
        .set('passwordPersonne', passwordPersonne),
    });
  }*/
}
