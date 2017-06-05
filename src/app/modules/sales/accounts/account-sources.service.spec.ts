import { TestBed, inject } from '@angular/core/testing';

import { AccountSourcesService } from './account-sources.service';

describe('AccountSourcesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountSourcesService]
    });
  });

  it('should be created', inject([AccountSourcesService], (service: AccountSourcesService) => {
    expect(service).toBeTruthy();
  }));
});
