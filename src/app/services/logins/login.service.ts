import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Person} from '../../models/person';

@Injectable()
export class LoginService {

  private isUserLoggerIn;
  private userName;

  constructor(public http: Http) {
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
}
