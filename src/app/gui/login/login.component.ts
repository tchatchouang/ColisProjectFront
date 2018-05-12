import {Component, OnInit} from '@angular/core';
import {IAppState} from '../../stores/reducers/reducers';
import {NgRedux, select} from '@angular-redux/store';
import {LoginActions} from '../../stores/actions/login/login.actions';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /*@select() loginResults;
  @select() loading;
  @select() error;
*/
  @select((state: IAppState) => state.login.loading) readonly loading$: Observable<string>;
  @select((state: IAppState) => state.login.error) readonly error$: Observable<string>;
  @select((state: IAppState) => state.login.messegeError) readonly messegeError$: Observable<string>;
  @select((state: IAppState) => state.login.loginResults) readonly loginResults$: Observable<string>;
  @select((state: IAppState) => state.login.isLogin) readonly isLogin$: Observable<string>;


  constructor(private ngRedux: NgRedux<IAppState>, public loginActions: LoginActions) {
  }

  ngOnInit() {
    this.loginActions.loginStart();
  }

  loginForm(dataForm) {
    this.loginActions.login(dataForm['username'], dataForm['password']);
  }

}
