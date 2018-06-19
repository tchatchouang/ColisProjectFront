import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {HomeActions} from '../../stores/actions/home/home-actions';
import {NgRedux, select} from '@angular-redux/store';
import {Observable} from 'rxjs/Observable';
import {IAppState} from '../../stores/reducers/reducers';
import {Trajet} from '../../models/trajet';
import {Person} from '../../models/person';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @ViewChild('lieuDepart') public lieuDepart: ElementRef;
  @ViewChild('lieuArriver') public lieuArriver: ElementRef;
  lieuDep: any;
  lieuArr: any;
  photoPaysDepart: any;
  photoPaysArrive: any;
  paysPaysDepart: any = [];
  paysPaysArrive: any = [];
  latitudeDepart: number;
  longitudeDepart: number;
  latitudeArriver: number;
  longitudeArriver: number;
  currentPage = 0;
  size = 50;
  pages: Array<number>;
  personnes: Observable<Person[]>;
  trajet: Trajet[];

  @select((state: IAppState) => state.home.trajetResults) readonly trajetResults$: Observable<Trajet>;
  @select((state: IAppState) => state.home.personeResults) readonly personeResults$: Observable<Person[]>;
  @select((state: IAppState) => state.home.totalPages) readonly totalPages$;

  constructor(private ngRedux: NgRedux<IAppState>, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private homeActions: HomeActions) {
    this.lieuDep = '';
    this.lieuArr = '';
  }

  ngOnInit() {
    this.initialiseAutoCompletePays();
    this.dosearch();
  }

  dosearch() {
    this.homeActions.home(this.lieuDep, this.lieuArr, this.currentPage, this.size);
  }

  goToPage(i: number) {
    this.currentPage = i;
    this.dosearch();
  }

  initialiseAutoCompletePays() {
    this.mapsAPILoader.load().then(
      () => {
        const autocompleteLieuDepart = new google.maps.places.Autocomplete(this.lieuDepart.nativeElement, {types: ['geocode']});
        const autocompleteLieuArriver = new google.maps.places.Autocomplete(this.lieuArriver.nativeElement, {types: ['geocode']});
        autocompleteLieuDepart.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocompleteLieuDepart.getPlace();
            this.lieuDep = place.name;
            this.photoPaysDepart = place.photos[0].getUrl({maxWidth: 400, maxHeight: 400});
            this.paysPaysDepart = place.formatted_address.split(',');
            this.latitudeArriver = place.geometry.location.lat();
            this.longitudeDepart = place.geometry.location.lng();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });

        autocompleteLieuArriver.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocompleteLieuArriver.getPlace();
            this.lieuArr = place.name;
            this.photoPaysArrive = place.photos[0].getUrl({maxWidth: 400, maxHeight: 400});
            this.paysPaysArrive = place.formatted_address.split(',');
            this.latitudeDepart = place.geometry.location.lat();
            this.longitudeArriver = place.geometry.location.lng();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );
  }
}
