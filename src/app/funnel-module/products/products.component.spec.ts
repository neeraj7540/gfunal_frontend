import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: FunnelProductsComponent;
  let fixture: ComponentFixture<FunnelProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
