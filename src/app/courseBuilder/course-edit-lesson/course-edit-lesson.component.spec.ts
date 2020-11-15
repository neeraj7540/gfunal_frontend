import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditLessonComponent } from './course-edit-lesson.component';

describe('CourseEditLessonComponent', () => {
  let component: CourseEditLessonComponent;
  let fixture: ComponentFixture<CourseEditLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEditLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
