import {Injectable} from '@angular/core';
import {Person} from '../../models/person';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {of} from 'rxjs/observable/of';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class LoginService {

  private isUserLoggerIn;
  private userName;
  private baseUrl: 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  saveDonneur(person: Person) {
    this.isUserLoggerIn = false;
  }

  setUserLoggerIn() {
    this.isUserLoggerIn = true;
  }

  setUserLoggerOut() {
    this.isUserLoggerIn = false;
  }


  getUserLoggerIn() {
    return this.isUserLoggerIn;
  }

  /* GET Person whose login and Pass is correct */
  getPersonnesLoginPass(loginPersonne: string, passwordPersonne: string): Observable<Person> {



    /*
    *trim() permet de retirer les blancs en début et fin de chaîne. Les blancs considérés sont les caractères
    *d'espacement (espace, tabulation, espace insécable, etc.) ainsi que les caractères de fin de ligne (LF, CR, etc.).
    */

    if (!loginPersonne.trim() && !passwordPersonne.trim()) {
      // if not search term, return empty hero array.
      return of();
    }

    return this.http.get<Person>('http://localhost:8080/personnes/checkLoginPass', {
      params: new HttpParams()
        .set('loginPersonne', loginPersonne)
        .set('passwordPersonne', passwordPersonne),
    });
  }


}
