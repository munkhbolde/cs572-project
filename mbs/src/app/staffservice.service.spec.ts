import { TestBed } from '@angular/core/testing';

import { StaffserviceService } from './staffservice.service';

describe('StaffserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaffserviceService = TestBed.get(StaffserviceService);
    expect(service).toBeTruthy();
  });
});
