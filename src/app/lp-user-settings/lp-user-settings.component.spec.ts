import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpUserSettingsComponent } from './lp-user-settings.component';

describe('LpUserSettingsComponent', () => {
  let component: LpUserSettingsComponent;
  let fixture: ComponentFixture<LpUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
