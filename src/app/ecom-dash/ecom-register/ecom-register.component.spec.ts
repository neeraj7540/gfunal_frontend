import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomRegisterComponent } from './ecom-register.component';

describe('EcomRegisterComponent', () => {
  let component: EcomRegisterComponent;
  let fixture: ComponentFixture<EcomRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
