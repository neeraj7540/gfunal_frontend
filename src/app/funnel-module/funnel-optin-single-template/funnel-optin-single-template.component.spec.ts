import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelOptinSingleTemplateComponent } from './funnel-optin-single-template.component';

describe('FunnelOptinSingleTemplateComponent', () => {
  let component: FunnelOptinSingleTemplateComponent;
  let fixture: ComponentFixture<FunnelOptinSingleTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelOptinSingleTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelOptinSingleTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
