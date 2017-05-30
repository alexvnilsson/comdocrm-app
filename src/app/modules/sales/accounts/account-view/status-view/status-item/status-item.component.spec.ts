import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusItemComponent } from './status-item.component';

describe('StatusItemComponent', () => {
  let component: StatusItemComponent;
  let fixture: ComponentFixture<StatusItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
