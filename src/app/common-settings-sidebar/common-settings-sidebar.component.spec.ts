import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSettingsSidebarComponent } from './common-settings-sidebar.component';

describe('CommonSettingsSidebarComponent', () => {
  let component: CommonSettingsSidebarComponent;
  let fixture: ComponentFixture<CommonSettingsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonSettingsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonSettingsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
