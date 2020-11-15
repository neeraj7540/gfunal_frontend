import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonQuizListComponent } from './course-lesson-quiz-list.component';

describe('CourseLessonQuizListComponent', () => {
  let component: CourseLessonQuizListComponent;
  let fixture: ComponentFixture<CourseLessonQuizListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLessonQuizListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonQuizListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
