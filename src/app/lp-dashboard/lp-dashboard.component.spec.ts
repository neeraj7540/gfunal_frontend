import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpDashboardComponent } from './lp-dashboard.component';

describe('LpDashboardComponent', () => {
  let component: LpDashboardComponent;
  let fixture: ComponentFixture<LpDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
