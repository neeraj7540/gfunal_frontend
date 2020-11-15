import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelOptinSettingsFieldsComponent } from './funnel-optin-settings-fields.component';

describe('FunnelOptinSettingsFieldsComponent', () => {
  let component: FunnelOptinSettingsFieldsComponent;
  let fixture: ComponentFixture<FunnelOptinSettingsFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelOptinSettingsFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelOptinSettingsFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
