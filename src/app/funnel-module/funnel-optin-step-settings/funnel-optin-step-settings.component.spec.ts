import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelOptinStepSettingsComponent } from './funnel-optin-step-settings.component';

describe('FunnelOptinStepSettingsComponent', () => {
  let component: FunnelOptinStepSettingsComponent;
  let fixture: ComponentFixture<FunnelOptinStepSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelOptinStepSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelOptinStepSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
