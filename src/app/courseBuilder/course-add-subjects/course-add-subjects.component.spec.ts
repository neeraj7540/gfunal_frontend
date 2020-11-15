import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAddSubjectsComponent } from './course-add-subjects.component';

describe('CourseAddSubjectsComponent', () => {
  let component: CourseAddSubjectsComponent;
  let fixture: ComponentFixture<CourseAddSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAddSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAddSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
