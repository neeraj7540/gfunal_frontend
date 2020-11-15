import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomDashProductDetailsComponent } from './ecom-dash-product-details.component';

describe('EcomDashProductDetailsComponent', () => {
  let component: EcomDashProductDetailsComponent;
  let fixture: ComponentFixture<EcomDashProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomDashProductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomDashProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
