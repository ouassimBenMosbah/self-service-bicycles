import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StationDetailService } from './station-detail.service';

describe('StationDetailService', () => {
  let service: StationDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(StationDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
