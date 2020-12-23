import { TestBed } from '@angular/core/testing';

import { HumanitixService } from './humanitix.service';

describe('HumanitixService', () => {
  let service: HumanitixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HumanitixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
