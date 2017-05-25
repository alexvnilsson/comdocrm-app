import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNavbarComponent } from './page-navbar.component';

describe('PageNavbarComponent', () => {
  let component: PageNavbarComponent;
  let fixture: ComponentFixture<PageNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
