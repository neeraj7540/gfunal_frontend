import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelSettingsComponent } from './funnel-settings.component';

describe('FunnelSettingsComponent', () => {
  let component: FunnelSettingsComponent;
  let fixture: ComponentFixture<FunnelSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
