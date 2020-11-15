import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonAddVideoComponent } from './course-lesson-add-video.component';

describe('CourseLessonAddVideoComponent', () => {
  let component: CourseLessonAddVideoComponent;
  let fixture: ComponentFixture<CourseLessonAddVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLessonAddVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonAddVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
