import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageBuilderComponent } from './landing-page-builder.component';

describe('LandingPageBuilderComponent', () => {
  let component: LandingPageBuilderComponent;
  let fixture: ComponentFixture<LandingPageBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
