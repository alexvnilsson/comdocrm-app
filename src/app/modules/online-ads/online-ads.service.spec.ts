import { TestBed, inject } from '@angular/core/testing';

import { OnlineAdsService } from './online-ads.service';

describe('OnlineAdsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlineAdsService]
    });
  });

  it('should ...', inject([OnlineAdsService], (service: OnlineAdsService) => {
    expect(service).toBeTruthy();
  }));
});
