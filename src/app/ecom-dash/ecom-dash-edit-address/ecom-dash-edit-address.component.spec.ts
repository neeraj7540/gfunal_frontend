import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomDashEditAddressComponent } from './ecom-dash-edit-address.component';

describe('EcomDashEditAddressComponent', () => {
  let component: EcomDashEditAddressComponent;
  let fixture: ComponentFixture<EcomDashEditAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomDashEditAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomDashEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
