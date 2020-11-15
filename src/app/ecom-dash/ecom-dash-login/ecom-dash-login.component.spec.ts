import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomDashLoginComponent } from './ecom-dash-login.component';

describe('EcomDashLoginComponent', () => {
  let component: EcomDashLoginComponent;
  let fixture: ComponentFixture<EcomDashLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomDashLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomDashLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
