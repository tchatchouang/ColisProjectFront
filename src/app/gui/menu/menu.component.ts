import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../stores/reducers/reducers';
import {Observable} from 'rxjs/Observable';
import {Person} from '../../models/person';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private state: IAppState;
  @select((state: IAppState) => state.signOut.isSignOut) readonly isSignOut$: Observable<boolean>;
  @select((state: IAppState) => state.login.isLogin) readonly isLogin$: Observable<boolean>;
  @select((state: IAppState) => state.login.loginResults) readonly loginResults$: Observable<Person>;


  constructor(private ngRedux: NgRedux<IAppState>,) {
  }

  ngOnInit() {
  }

  signIn() {
  }

  signUp() {
  }

  signOut() {
  }

}


