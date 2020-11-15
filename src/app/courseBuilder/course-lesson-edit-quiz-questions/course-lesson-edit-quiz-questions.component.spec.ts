import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonEditQuizQuestionsComponent } from './course-lesson-edit-quiz-questions.component';

describe('CourseLessonEditQuizQuestionsComponent', () => {
  let component: CourseLessonEditQuizQuestionsComponent;
  let fixture: ComponentFixture<CourseLessonEditQuizQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLessonEditQuizQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonEditQuizQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
