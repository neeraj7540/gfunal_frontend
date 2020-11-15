import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonAssignmentListComponent } from './course-lesson-assignment-list.component';

describe('CourseLessonAssignmentListComponent', () => {
  let component: CourseLessonAssignmentListComponent;
  let fixture: ComponentFixture<CourseLessonAssignmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLessonAssignmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
