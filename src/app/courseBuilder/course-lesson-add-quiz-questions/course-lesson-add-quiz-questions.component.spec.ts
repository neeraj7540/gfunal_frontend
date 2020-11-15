import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonAddQuizQuestionsComponent } from './course-lesson-add-quiz-questions.component';

describe('CourseLessonAddQuizQuestionsComponent', () => {
  let component: CourseLessonAddQuizQuestionsComponent;
  let fixture: ComponentFixture<CourseLessonAddQuizQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLessonAddQuizQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonAddQuizQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
