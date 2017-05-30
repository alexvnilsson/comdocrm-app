import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.router.navigate(['/']);
  }

}
