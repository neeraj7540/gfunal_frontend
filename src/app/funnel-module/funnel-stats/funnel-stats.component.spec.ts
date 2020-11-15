import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelStatsComponent } from './funnel-stats.component';

describe('FunnelStatsComponent', () => {
  let component: FunnelStatsComponent;
  let fixture: ComponentFixture<FunnelStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
