import { TestBed, inject } from '@angular/core/testing';

import { SqlServiceService } from './sql-service.service';

describe('SqlServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SqlServiceService]
    });
  });

  it('should be created', inject([SqlServiceService], (service: SqlServiceService) => {
    expect(service).toBeTruthy();
  }));
});
