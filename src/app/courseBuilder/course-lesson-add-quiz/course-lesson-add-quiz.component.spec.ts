import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonAddQuizComponent } from './course-lesson-add-quiz.component';

describe('CourseLessonAddQuizComponent', () => {
  let component: CourseLessonAddQuizComponent;
  let fixture: ComponentFixture<CourseLessonAddQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLessonAddQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonAddQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
