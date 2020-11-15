import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomLoginComponent } from './ecom-login.component';

describe('EcomLoginComponent', () => {
  let component: EcomLoginComponent;
  let fixture: ComponentFixture<EcomLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
