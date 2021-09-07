import { TestBed } from '@angular/core/testing';

import { ClientPositionService } from './client-position.service';

describe('ClientPositionService', () => {
  let service: ClientPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
