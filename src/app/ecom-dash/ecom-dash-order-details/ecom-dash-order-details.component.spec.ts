import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomDashOrderDetailsComponent } from './ecom-dash-order-details.component';

describe('EcomDashOrderDetailsComponent', () => {
  let component: EcomDashOrderDetailsComponent;
  let fixture: ComponentFixture<EcomDashOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomDashOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomDashOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
