import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelDashboardComponent } from './funnel-dashboard.component';

describe('FunnelDashboardComponent', () => {
  let component: FunnelDashboardComponent;
  let fixture: ComponentFixture<FunnelDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
