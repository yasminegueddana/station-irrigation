import { TestBed } from '@angular/core/testing';

import { DebitMesureService } from './debit-mesure.service';

describe('DebitMesureService', () => {
  let service: DebitMesureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebitMesureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
