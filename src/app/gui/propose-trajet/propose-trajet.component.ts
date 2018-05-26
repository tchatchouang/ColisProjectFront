import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ProposerTrajetActions} from '../../stores/actions/proposerTrajet/proposer-trajet-actions';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../stores/reducers/reducers';

@Component({
  selector: 'app-propose-trajet',
  templateUrl: './propose-trajet.component.html',
  styleUrls: ['./propose-trajet.component.css']
})
export class ProposeTrajetComponent implements OnInit {

  form: FormGroup;
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

  constructor(private ngRedux: NgRedux<IAppState>, private proposerTrajetActions: ProposerTrajetActions, private formBuilder: FormBuilder,
              private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
  }


  ngOnInit() {
    this.proposerTrajetActions.proposerTrajetLoad();
    this.form = this.formBuilder.group({
      libelleTrajet: new FormControl(),
      lieuDepart: new FormControl(),
      lieuArriver: new FormControl(),
      dateDepart: new FormControl(),
      dateArriver: new FormControl(),
      photoPaysDepart: new FormControl(),
      photoPaysArrive: new FormControl(),
      paysDepart: new FormControl(),
      paysArrive: new FormControl(),
      poidColis: new FormControl(),
      latitudeDepart: new FormControl(),
      longitudeDepart: new FormControl(),
      latitudeArriver: new FormControl(),
      longitudeArriver: new FormControl(),
    });
    this.initialiseAutoCompletePays();
  }

  initialiseAutoCompletePays() {
    this.mapsAPILoader.load().then(
      () => {
        let autocompleteLieuDepart = new google.maps.places.Autocomplete(this.lieuDepart.nativeElement, {types: ['geocode']});
        let autocompleteLieuArriver = new google.maps.places.Autocomplete(this.lieuArriver.nativeElement, {types: ['geocode']});

        autocompleteLieuDepart.addListener('place_changed', () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocompleteLieuDepart.getPlace();
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
            let place: google.maps.places.PlaceResult = autocompleteLieuArriver.getPlace();
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

  onTrajet() {
    this.form.patchValue({
      lieuDepart: this.lieuDep,
      lieuArriver: this.lieuArr,
      photoPaysDepart: this.photoPaysDepart,
      photoPaysArrive: this.photoPaysArrive,
      paysDepart: this.paysPaysDepart[1],
      paysArrive: this.paysPaysArrive[1],
      latitudeDepart: this.latitudeArriver,
      longitudeDepart: this.longitudeDepart,
      latitudeArriver: this.latitudeArriver,
      longitudeArriver: this.longitudeArriver,
    });
    this.proposerTrajetActions.proposerTrajetOnClick(this.form);
  }


}
