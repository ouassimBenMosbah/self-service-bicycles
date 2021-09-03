import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StationsDatastoreService } from './stations-datastore.service';

describe('StationsDatastoreService', () => {
  let service: StationsDatastoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(StationsDatastoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
