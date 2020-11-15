import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcSettingsComponent } from './ec-settings.component';

describe('EcSettingsComponent', () => {
  let component: EcSettingsComponent;
  let fixture: ComponentFixture<EcSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
