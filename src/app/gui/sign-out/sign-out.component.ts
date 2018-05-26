import {Component, OnInit} from '@angular/core';
import {SignOutActions} from '../../stores/actions/signOut/sign-out-actions';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  constructor(private signOutActions: SignOutActions) {
  }

  ngOnInit() {
    this.signOutActions.signOut();
  }

}
