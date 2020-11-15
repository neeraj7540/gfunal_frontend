import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditLessonAddVideoComponent } from './course-edit-lesson-add-video.component';

describe('CourseEditLessonAddVideoComponent', () => {
  let component: CourseEditLessonAddVideoComponent;
  let fixture: ComponentFixture<CourseEditLessonAddVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEditLessonAddVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditLessonAddVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
