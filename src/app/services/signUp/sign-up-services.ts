import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormGroup} from '@angular/forms';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class SignUpServices {
  constructor(private http: HttpClient) {
  }

  signUp(form: FormGroup): Observable<FormGroup> {
    return this.http.post<FormGroup>('http://localhost:8080/personnes', form.value);
  }


}
