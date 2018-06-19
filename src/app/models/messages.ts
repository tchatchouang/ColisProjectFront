import {Conversations} from './conversations';
import {Person} from './person';

export class Messages {
  idMessage: number;
  cotenueMessage: string;
  etatMessage: string;
  dateMessage: Date;
  conversations: Conversations;
  personnes: Person;

  constructor(cotenueMessage: string, dateMessage: Date, conversations: Conversations, personnes: Person) {
    this.cotenueMessage = cotenueMessage;
    this.dateMessage = dateMessage;
    this.conversations = conversations;
    this.personnes = personnes;
  }
}
