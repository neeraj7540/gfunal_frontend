import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpAddUserSettingsComponent } from './lp-add-user-settings.component';

describe('LpAddUserSettingsComponent', () => {
  let component: LpAddUserSettingsComponent;
  let fixture: ComponentFixture<LpAddUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpAddUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpAddUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
