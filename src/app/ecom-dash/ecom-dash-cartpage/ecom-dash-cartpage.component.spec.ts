import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomDashCartpageComponent } from './ecom-dash-cartpage.component';

describe('EcomDashCartpageComponent', () => {
  let component: EcomDashCartpageComponent;
  let fixture: ComponentFixture<EcomDashCartpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomDashCartpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomDashCartpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
