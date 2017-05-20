import { Component, OnInit } from '@angular/core';

import { OnlineAdsService } from '../online-ads.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private adsService: OnlineAdsService) { }

  ngOnInit() {
    
  }

  onOpenAuth() {
    this.adsService.getAuthentication();
  }
}
