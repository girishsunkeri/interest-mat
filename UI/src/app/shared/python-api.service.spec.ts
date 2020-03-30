import { TestBed } from '@angular/core/testing';

import { PythonApiService } from './python-api.service';

describe('PythonApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PythonApiService = TestBed.get(PythonApiService);
    expect(service).toBeTruthy();
  });
});
