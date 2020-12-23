import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanitixTicketsComponent } from './humanitix-tickets.component';

describe('HumanitixTicketsComponent', () => {
  let component: HumanitixTicketsComponent;
  let fixture: ComponentFixture<HumanitixTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumanitixTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanitixTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
