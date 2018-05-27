import {Component, OnInit} from '@angular/core';
import {TrajetPublierActions} from '../../stores/actions/trajetPublier/trajet-publier-actions';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs/Observable';
import {IAppState} from '../../stores/reducers/reducers';
import {Trajet} from '../../models/trajet';

@Component({
  selector: 'app-trajet-publier',
  templateUrl: './trajet-publier.component.html',
  styleUrls: ['./trajet-publier.component.css']
})
export class TrajetPublierComponent implements OnInit {

  @select((state: IAppState) => state.trajetPublier.trajetResults) readonly trajetResults$: Observable<Trajet[]>;

  constructor(private trajetPublierActions: TrajetPublierActions) {
  }

  ngOnInit() {
    this.trajetPublierActions.trajetPublier();
  }

}
