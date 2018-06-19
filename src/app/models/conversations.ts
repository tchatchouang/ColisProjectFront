import {Person} from './person';

export class Conversations {
  idConversation: number;
  dateCreation: Date;
  personnes1: Person;
  personnes2: Person;

  constructor(idConversation: number) {
    this.idConversation = idConversation;
  }
}
