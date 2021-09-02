import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GbfsApiService } from './gbfs-api.service';

describe('GbfsApiService', () => {
  let service: GbfsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(GbfsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
