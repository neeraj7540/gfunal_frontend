import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonEditQuizComponent } from './course-lesson-edit-quiz.component';

describe('CourseLessonEditQuizComponent', () => {
  let component: CourseLessonEditQuizComponent;
  let fixture: ComponentFixture<CourseLessonEditQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLessonEditQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonEditQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
