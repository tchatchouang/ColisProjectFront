import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../stores/reducers/reducers';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private state: IAppState;
  @select((state: IAppState) => state.signOut.isSignOut) readonly isSignOut$: Observable<string>;
  @select((state: IAppState) => state.login.isLogin) readonly isLogin$: Observable<string>;


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


