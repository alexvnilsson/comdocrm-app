import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsViewSidePanelComponent } from './details-view-side-panel.component';

describe('DetailsViewSidePanelComponent', () => {
  let component: DetailsViewSidePanelComponent;
  let fixture: ComponentFixture<DetailsViewSidePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsViewSidePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsViewSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
