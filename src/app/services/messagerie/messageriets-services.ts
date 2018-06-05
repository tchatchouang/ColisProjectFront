import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Conversations} from '../../models/conversations';
import {Messages} from '../../models/messages';
import * as io from 'socket.io-client';

@Injectable()
export class MessagerietsServices {
  private url = 'http://localhost:3000';
  private socket;

  constructor(public http: HttpClient) {
    this.socket = io(this.url);
  }

  getConversations(idPersonne: string): Observable<Conversations> {
    return this.http.get<Conversations>('http://localhost:8080/conversations/listParPersonne', {
      params: new HttpParams()
        .set('idPersonne', idPersonne),
    });
  }

  getlistMessageFromConversation(idConversation: string): Observable<Messages[]> {
    return this.http.get<Messages[]>('http://localhost:8080/messages/listMessageFromConver', {
      params: new HttpParams()
        .set('idConversation', idConversation),
    });
  }

  saveMessage(cotenueMessage: string, dateEnvoie: Date, idConversation: number, idPersonne: number): Observable<Messages[]> {
    return this.http.post<Messages[]>('http://localhost:8080/messages/saveMessageSend',
      {cotenueMessage: cotenueMessage, dateEnvoie: dateEnvoie, idConversation: idConversation, idPersonne: idPersonne});
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  };
}
