import { Component, OnInit } from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../stores/reducers/reducers';
import {LoginActions, LoginActionsTypes} from '../../stores/actions/login/login.actions';
import {Observable} from 'rxjs/Observable';
import {ILogin} from '../../stores/reducers/login/login.reducers';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @select() loginResults;
  @select() loading;
  @select() error;

  /*@select((state: IAppState) => state.login.loading) readonly loading$: Observable<string>;
  @select((state: IAppState) => state.login.error) readonly error$: Observable<string>;
  @select((state: IAppState) => state.login.loginResults) readonly loginResults$: Observable<string>;
*/

  constructor(private ngRedux: NgRedux<IAppState>, public loginActions: LoginActions) {
  }

  ngOnInit() {
    this.loginActions.login('toto', 'toto');

  }
}


