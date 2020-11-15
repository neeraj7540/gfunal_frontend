import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelOptinTemplateThumbComponent } from './funnel-optin-template-thumb.component';

describe('FunnelOptinTemplateThumbComponent', () => {
  let component: FunnelOptinTemplateThumbComponent;
  let fixture: ComponentFixture<FunnelOptinTemplateThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelOptinTemplateThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelOptinTemplateThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
