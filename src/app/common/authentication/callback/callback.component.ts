import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit, AfterViewInit {
  constructor (
    private router: Router,
    private authService: AuthenticationService
  ) {
      
   }

  ngOnInit() {
    this.authService.isAuthenticating();
  }

  ngAfterViewInit() {
    this.authService.handleAuthentication().subscribe(result => {

    });
  }

}
