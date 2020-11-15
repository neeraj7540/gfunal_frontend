import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcGeneralSettingsComponent } from './ec-general-settings.component';

describe('EcGeneralSettingsComponent', () => {
  let component: EcGeneralSettingsComponent;
  let fixture: ComponentFixture<EcGeneralSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcGeneralSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcGeneralSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
