import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAccessLevelsNamePriceComponent } from './course-access-levels-name-price.component';

describe('CourseAccessLevelsNamePriceComponent', () => {
  let component: CourseAccessLevelsNamePriceComponent;
  let fixture: ComponentFixture<CourseAccessLevelsNamePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAccessLevelsNamePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAccessLevelsNamePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
