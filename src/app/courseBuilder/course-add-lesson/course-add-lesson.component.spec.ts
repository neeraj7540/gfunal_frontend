import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAddLessonComponent } from './course-add-lesson.component';

describe('CourseAddLessonComponent', () => {
  let component: CourseAddLessonComponent;
  let fixture: ComponentFixture<CourseAddLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAddLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAddLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
