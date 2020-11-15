import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomDashDashboardComponent } from './ecom-dash-dashboard.component';

describe('EcomDashDashboardComponent', () => {
  let component: EcomDashDashboardComponent;
  let fixture: ComponentFixture<EcomDashDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomDashDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomDashDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
