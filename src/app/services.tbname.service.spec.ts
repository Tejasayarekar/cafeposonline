import { TestBed } from '@angular/core/testing';

import { Services.TbnameService } from './services.tbname.service';

describe('Services.TbnameService', () => {
  let service: Services.TbnameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Services.TbnameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
