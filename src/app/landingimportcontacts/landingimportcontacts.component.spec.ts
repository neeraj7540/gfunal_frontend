import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingimportcontactsComponent } from './landingimportcontacts.component';

describe('LandingimportcontactsComponent', () => {
  let component: LandingimportcontactsComponent;
  let fixture: ComponentFixture<LandingimportcontactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingimportcontactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingimportcontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
