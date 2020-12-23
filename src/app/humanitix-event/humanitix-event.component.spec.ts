import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanitixEventComponent } from './humanitix-event.component';

describe('HumanitixEventComponent', () => {
  let component: HumanitixEventComponent;
  let fixture: ComponentFixture<HumanitixEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumanitixEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanitixEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
