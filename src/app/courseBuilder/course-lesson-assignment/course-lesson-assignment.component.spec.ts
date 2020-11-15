import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonAssignmentComponent } from './course-lesson-assignment.component';

describe('CourseLessonAssignmentComponent', () => {
  let component: CourseLessonAssignmentComponent;
  let fixture: ComponentFixture<CourseLessonAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLessonAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
