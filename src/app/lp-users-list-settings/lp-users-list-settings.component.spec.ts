import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpUsersListSettingsComponent } from './lp-users-list-settings.component';

describe('LpUsersListSettingsComponent', () => {
  let component: LpUsersListSettingsComponent;
  let fixture: ComponentFixture<LpUsersListSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpUsersListSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpUsersListSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
