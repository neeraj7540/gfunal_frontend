import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFunnelProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddFunnelProductComponent;
  let fixture: ComponentFixture<AddFunnelProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFunnelProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFunnelProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
