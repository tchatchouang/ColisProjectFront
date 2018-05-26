import {Person} from './person';
import {Trajet} from './trajet';

export class PropseTrajet {
  personnes: Person;
  trajet: Trajet;
  poidColis: number;

  constructor(personnes: Person, trajet: Trajet, poidColis: number) {
    this.personnes = personnes;
    this.trajet = trajet;
    this.poidColis = poidColis;
  }

  public getPersonne(): Person {
    return this.personnes;
  }

  public setPersonne(personnes: Person) {
    this.personnes = personnes;
  }

  public getTrajet(): Trajet {
    return this.trajet;
  }

  public setTrajet(trajet: Trajet) {
    this.trajet = trajet;
  }

  public getPoidColis(): number {
    return this.poidColis;
  }

  public setPoidColis(poidColis: number) {
    this.poidColis = poidColis;
  }
}

