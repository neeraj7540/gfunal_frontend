import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditLessonAssignmentComponent } from './course-edit-lesson-assignment.component';

describe('CourseEditLessonAssignmentComponent', () => {
  let component: CourseEditLessonAssignmentComponent;
  let fixture: ComponentFixture<CourseEditLessonAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEditLessonAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditLessonAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
