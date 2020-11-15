import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpDomainSettingsComponent } from './lp-domain-settings.component';

describe('LpDomainSettingsComponent', () => {
  let component: LpDomainSettingsComponent;
  let fixture: ComponentFixture<LpDomainSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpDomainSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpDomainSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
