import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQuizViewComponent } from './student-quiz-view.component';

describe('StudentQuizViewComponent', () => {
  let component: StudentQuizViewComponent;
  let fixture: ComponentFixture<StudentQuizViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentQuizViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentQuizViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
