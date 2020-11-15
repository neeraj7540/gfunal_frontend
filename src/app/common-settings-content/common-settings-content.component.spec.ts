import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSettingsContentComponent } from './common-settings-content.component';

describe('CommonSettingsContentComponent', () => {
  let component: CommonSettingsContentComponent;
  let fixture: ComponentFixture<CommonSettingsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonSettingsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonSettingsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
