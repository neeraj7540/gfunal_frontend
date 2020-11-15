import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelStepsComponent } from './funnel-steps.component';

describe('FunnelStepsComponent', () => {
  let component: FunnelStepsComponent;
  let fixture: ComponentFixture<FunnelStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
