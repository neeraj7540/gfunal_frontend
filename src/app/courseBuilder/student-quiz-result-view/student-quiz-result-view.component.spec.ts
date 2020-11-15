import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQuizResultViewComponent } from './student-quiz-result-view.component';

describe('StudentQuizResultViewComponent', () => {
  let component: StudentQuizResultViewComponent;
  let fixture: ComponentFixture<StudentQuizResultViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentQuizResultViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentQuizResultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
