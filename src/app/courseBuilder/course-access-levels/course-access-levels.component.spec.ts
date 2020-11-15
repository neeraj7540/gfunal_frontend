import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAccessLevelsComponent } from './course-access-levels.component';

describe('CourseAccessLevelsComponent', () => {
  let component: CourseAccessLevelsComponent;
  let fixture: ComponentFixture<CourseAccessLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAccessLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAccessLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
