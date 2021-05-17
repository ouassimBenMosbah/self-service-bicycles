import { TestBed } from '@angular/core/testing';

import { GbfsApiService } from './gbfs-api.service';

describe('GbfsApiService', () => {
  let service: GbfsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GbfsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
