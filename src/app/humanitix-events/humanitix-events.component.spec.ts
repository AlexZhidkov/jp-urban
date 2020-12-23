import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanitixEventsComponent } from './humanitix-events.component';

describe('HumanitixEventsComponent', () => {
  let component: HumanitixEventsComponent;
  let fixture: ComponentFixture<HumanitixEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumanitixEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanitixEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
