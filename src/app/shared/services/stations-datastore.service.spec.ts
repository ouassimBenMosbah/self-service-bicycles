import { TestBed } from '@angular/core/testing';

import { StationsDatastoreService } from './stations-datastore.service';

describe('StationsDatastoreService', () => {
  let service: StationsDatastoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationsDatastoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
