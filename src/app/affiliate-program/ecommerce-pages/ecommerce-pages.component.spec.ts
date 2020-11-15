import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommercePagesComponent } from './ecommerce-pages.component';

describe('EcommercePagesComponent', () => {
  let component: EcommercePagesComponent;
  let fixture: ComponentFixture<EcommercePagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommercePagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommercePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
