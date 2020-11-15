import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedLandingPageComponent } from './saved-landing-page.component';

describe('SavedLandingPageComponent', () => {
  let component: SavedLandingPageComponent;
  let fixture: ComponentFixture<SavedLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
