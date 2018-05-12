import {Injectable} from '@angular/core';
import {Person} from '../../models/person';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {of} from 'rxjs/observable/of';


@Injectable()
export class SignOutService {

  private isSignOut;

  constructor(private http: HttpClient) {
  }

  saveDonneur(person: Person) {
    this.isSignOut = false;
  }

  setSignOut() {
    this.isSignOut = true;
  }

  getSignOut() {
    return this.isSignOut;
  }

}
