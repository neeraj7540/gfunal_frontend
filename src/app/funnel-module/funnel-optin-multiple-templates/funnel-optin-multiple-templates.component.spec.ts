import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelOptinMultipleTemplatesComponent } from './funnel-optin-multiple-templates.component';

describe('FunnelOptinMultipleTemplatesComponent', () => {
  let component: FunnelOptinMultipleTemplatesComponent;
  let fixture: ComponentFixture<FunnelOptinMultipleTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelOptinMultipleTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelOptinMultipleTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
