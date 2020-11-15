import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelOptinStepSettingsFieldsComponent } from './funnel-optin-step-settings-fields.component';

describe('FunnelOptinStepSettingsFieldsComponent', () => {
  let component: FunnelOptinStepSettingsFieldsComponent;
  let fixture: ComponentFixture<FunnelOptinStepSettingsFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelOptinStepSettingsFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelOptinStepSettingsFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
