import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomDashSignupComponent } from './ecom-dash-signup.component';

describe('EcomDashSignupComponent', () => {
  let component: EcomDashSignupComponent;
  let fixture: ComponentFixture<EcomDashSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomDashSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomDashSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
