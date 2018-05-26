import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../stores/reducers/reducers';
import {SignUpActions} from '../../stores/actions/singUp/sign-up-actions';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  form: FormGroup;
  files: FileList;
  file_src: string;
  @ViewChild('paysPersonne') public paysPersonne: ElementRef;
  paysPers: any;


  constructor(private ngRedux: NgRedux<IAppState>, private signUpAction: SignUpActions, private formBuilder: FormBuilder,
              private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    this.file_src = '//placehold.it/200';
  }

  ngOnInit() {
    this.signUpAction.signUpLoad();
    this.intAutocompletPays();

    this.form = this.formBuilder.group({
      nomPersonne: new FormControl(),
      prenomPersonn: new FormControl(),
      dateNaissancePersonne: new FormControl(),
      adresseCompletePersonne: new FormControl(),
      photoPersonne: new FormControl(),
      numeroTelephonePersonne: new FormControl(),
      emailPersonne: new FormControl(),
      statusPersonne: new FormControl(),
      paysPersonne: new FormControl(),
      loginPersonne: new FormControl(),
      passwordPersonne: new FormControl()
    });
  }

  onSavePersone() {
    this.form.patchValue({
      photoPersonne: this.file_src,
      paysPersonne: this.paysPers.toString(),
    });
    this.signUpAction.signUpOnClickButton(this.form);
  }

  intAutocompletPays() {
    this.mapsAPILoader.load().then(
      () => {
        let autocompleteLieuDepart = new google.maps.places.Autocomplete(this.paysPersonne.nativeElement, {types: ['geocode']});

        autocompleteLieuDepart.addListener('place_changed', () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocompleteLieuDepart.getPlace();
            this.paysPers = place.formatted_address.split(',');
            /*this.lieuDep = place.name;
            this.photoPaysDepart = place.icon;
            this.paysPaysDepart  = place.formatted_address.split(",")*/
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );
  }

  onChange(input) {
    this.file_src = '//placehold.it/200';
    // Loop through each picture file
    this.files = (input.target.files[0]);

    // Create an img element and add the image file data to it
    var img = document.createElement('img');
    img.src = window.URL.createObjectURL(input.target.files[0]);

    // Create a FileReader
    var reader = new FileReader();

    // Add an event listener to deal with the file when the reader is complete
    reader.addEventListener('load', (event: any) => {
      // Get the event.target.result from the reader (base64 of the image)
      img.src = event.target.result;

      // Resize the image
      var resized_img = this.resize(img);
      // Push the img src (base64 string) into our array that we display in our html template
      this.file_src = resized_img;
    }, false);

    reader.readAsDataURL(input.target.files[0]);

  }

  imageChange(input) {
    this.file_src = '//placehold.it/200';
    // Loop through each picture file
    this.files = (input.target.files[0]);

    // Create an img element and add the image file data to it
    var img = document.createElement('img');
    img.src = window.URL.createObjectURL(input.target.files[0]);

    // Create a FileReader
    var reader = new FileReader();

    // Add an event listener to deal with the file when the reader is complete
    reader.addEventListener('load', (event: any) => {
      // Get the event.target.result from the reader (base64 of the image)
      img.src = event.target.result;

      // Resize the image
      var resized_img = img.src;//this.resize(img);
      // Push the img src (base64 string) into our array that we display in our html template
      this.file_src = resized_img;
      console.log(' base 64 ' + this.file_src);
    }, false);

    reader.readAsDataURL(input.target.files[0]);
    //}
  }

  resize(img, MAX_WIDTH: number = 100, MAX_HEIGHT: number = 100) {
    var canvas = document.createElement('canvas');


    var width = img.width;
    var height = img.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0, width, height);

    var dataUrl = canvas.toDataURL('image/jpeg');
    // IMPORTANT: 'jpeg' NOT 'jpg'
    return dataUrl;
  }

}
