import {Component, OnInit} from '@angular/core';
import {Trajet} from '../../models/trajet';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs/Observable';
import {IAppState} from '../../stores/reducers/reducers';

@Component({
  selector: 'app-general-dashboard',
  templateUrl: './general-dashboard.component.html',
  styleUrls: ['./general-dashboard.component.css']
})
export class GeneralDashboardComponent implements OnInit {

  @select((state: IAppState) => state.trajetPublier.trajetResults) readonly trajetResults$: Observable<Trajet>;

  constructor() { }

  ngOnInit() {
  }

}
