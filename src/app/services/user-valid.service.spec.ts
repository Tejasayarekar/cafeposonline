import { TestBed } from '@angular/core/testing';

import { UserValidService } from './user-valid.service';

describe('UserValidService', () => {
  let service: UserValidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserValidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
