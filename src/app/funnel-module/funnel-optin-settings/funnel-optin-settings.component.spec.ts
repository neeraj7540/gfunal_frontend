import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelOptinSettingsComponent } from './funnel-optin-settings.component';

describe('FunnelOptinSettingsComponent', () => {
  let component: FunnelOptinSettingsComponent;
  let fixture: ComponentFixture<FunnelOptinSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelOptinSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelOptinSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
