import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomDashAddAddressComponent } from './ecom-dash-add-address.component';

describe('EcomDashAddAddressComponent', () => {
  let component: EcomDashAddAddressComponent;
  let fixture: ComponentFixture<EcomDashAddAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomDashAddAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomDashAddAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
