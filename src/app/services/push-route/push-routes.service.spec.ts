import {inject, TestBed} from '@angular/core/testing';

import {PushRoutesService} from './push-routes.service';

describe('PushRoutesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PushRoutesService]
    });
  });

  it('should be created', inject([PushRoutesService], (service: PushRoutesService) => {
    expect(service).toBeTruthy();
  }));
});
