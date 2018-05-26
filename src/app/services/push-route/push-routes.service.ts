import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class PushRoutesService {

  constructor(private router: Router) {
  }

  pushRoute(route: string) {
    this.router.navigate([route]);
  }
}
