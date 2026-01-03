import { TestBed } from '@angular/core/testing';

import { AlerteEauService } from './alerte-eau.service';

describe('AlerteEauService', () => {
  let service: AlerteEauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlerteEauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
