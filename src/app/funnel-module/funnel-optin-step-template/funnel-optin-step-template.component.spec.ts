import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelOptinStepTemplateComponent } from './funnel-optin-step-template.component';

describe('FunnelOptinStepTemplateComponent', () => {
  let component: FunnelOptinStepTemplateComponent;
  let fixture: ComponentFixture<FunnelOptinStepTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelOptinStepTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelOptinStepTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
