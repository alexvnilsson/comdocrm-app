import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankStatusItemComponent } from './blank-status-item.component';

describe('BlankStatusItemComponent', () => {
  let component: BlankStatusItemComponent;
  let fixture: ComponentFixture<BlankStatusItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankStatusItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankStatusItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
