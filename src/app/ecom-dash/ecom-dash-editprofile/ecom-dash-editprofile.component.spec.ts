import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomDashEditprofileComponent } from './ecom-dash-editprofile.component';

describe('EcomDashEditprofileComponent', () => {
  let component: EcomDashEditprofileComponent;
  let fixture: ComponentFixture<EcomDashEditprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomDashEditprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomDashEditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
