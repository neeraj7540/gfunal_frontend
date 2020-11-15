import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomDashAllProductsComponent } from './ecom-dash-all-products.component';

describe('EcomDashAllProductsComponent', () => {
  let component: EcomDashAllProductsComponent;
  let fixture: ComponentFixture<EcomDashAllProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomDashAllProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomDashAllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
