import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StationsListService } from './stations-list.service';

describe('StationsListService', () => {
  let service: StationsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(StationsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
