import { TestBed } from '@angular/core/testing';

import { IntertokenService } from './intertoken.service';

describe('IntertokenService', () => {
  let service: IntertokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntertokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
