import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../stores/reducers/reducers';
import {MessagerieActions} from '../../stores/actions/messagerie/messagerie.actions';
import {Observable} from 'rxjs/Observable';
import {Person} from '../../models/person';
import {Conversations} from '../../models/conversations';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent implements OnInit {

  @select((state: IAppState) => state.messagerie.conversationResults) readonly conversationResults$: Observable<Conversations>;
  @select((state: IAppState) => state.login.loginResults) readonly loginResults$: Observable<Person>;

  constructor(private ngRedux: NgRedux<IAppState>, private messagerieActions: MessagerieActions) {
  }

  ngOnInit() {
    this.messagerieActions.messagerie();
  }

}
