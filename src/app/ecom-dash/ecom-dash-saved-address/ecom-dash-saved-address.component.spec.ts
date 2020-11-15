import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomDashSavedAddressComponent } from './ecom-dash-saved-address.component';

describe('EcomDashSavedAddressComponent', () => {
  let component: EcomDashSavedAddressComponent;
  let fixture: ComponentFixture<EcomDashSavedAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomDashSavedAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomDashSavedAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
