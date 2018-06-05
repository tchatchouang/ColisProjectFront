import {Component, OnInit} from '@angular/core';
import {MessagerieActions} from '../../stores/actions/messagerie/messagerie.actions';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../stores/reducers/reducers';
import {ActivatedRoute} from '@angular/router';
import {Person} from '../../models/person';
import {Observable} from 'rxjs/Observable';
import {Messages} from '../../models/messages';
import {Conversations} from '../../models/conversations';


@Component({
  selector: 'app-messagerie-message',
  templateUrl: './messagerie-message.component.html',
  styleUrls: ['./messagerie-message.component.css']
})
export class MessagerieMessageComponent implements OnInit {
  @select((state: IAppState) => state.messagerie.messages) readonly messages$: Observable<Messages[]>;
  @select((state: IAppState) => state.login.loginResults) readonly loginResults$: Observable<Person>;
  @select((state: IAppState) => state.messagerie.conversationResults) readonly conversationResults$: Observable<Conversations>;

  replyMessage: any;
  idConversation: any;

  constructor(private ngRedux: NgRedux<IAppState>, private messagerieActions: MessagerieActions, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initiConversation();
  }

  initiConversation() {
    this.route.params.subscribe(
      params => {
        this.idConversation = params['idConversation'];
        this.messagerieActions.messages(params['idConversation']);
      });
  }

  getMessageReply() {
    if (this.replyMessage != null) {
      this.messagerieActions.sendMessage(this.replyMessage, new Date(), Number(this.idConversation), this.ngRedux.getState().login.loginResults.idPersonne);
      this.initiConversation();
      this.replyMessage = null;
    }
  }
}
