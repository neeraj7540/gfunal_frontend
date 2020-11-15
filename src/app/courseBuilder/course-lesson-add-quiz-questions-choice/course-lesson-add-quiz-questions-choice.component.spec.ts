import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonAddQuizQuestionsChoiceComponent } from './course-lesson-add-quiz-questions-choice.component';

describe('CourseLessonAddQuizQuestionsChoiceComponent', () => {
  let component: CourseLessonAddQuizQuestionsChoiceComponent;
  let fixture: ComponentFixture<CourseLessonAddQuizQuestionsChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLessonAddQuizQuestionsChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonAddQuizQuestionsChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
