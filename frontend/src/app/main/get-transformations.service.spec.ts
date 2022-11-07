import { TestBed } from '@angular/core/testing';

import { GetTransformationsService } from './get-transformations.service';

describe('GetTransformationsService', () => {
  let service: GetTransformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTransformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
