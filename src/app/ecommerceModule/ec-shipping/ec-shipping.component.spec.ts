import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcShippingComponent } from './ec-shipping.component';

describe('EcShippingComponent', () => {
  let component: EcShippingComponent;
  let fixture: ComponentFixture<EcShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
