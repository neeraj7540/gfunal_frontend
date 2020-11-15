import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonEditQuizQuestionsChoiceComponent } from './course-lesson-edit-quiz-questions-choice.component';

describe('CourseLessonEditQuizQuestionsChoiceComponent', () => {
  let component: CourseLessonEditQuizQuestionsChoiceComponent;
  let fixture: ComponentFixture<CourseLessonEditQuizQuestionsChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLessonEditQuizQuestionsChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonEditQuizQuestionsChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
