import { TestBed } from '@angular/core/testing';

import { StationDetailService } from './station-detail.service';

describe('StationDetailService', () => {
  let service: StationDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
