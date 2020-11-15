import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonVideosListComponent } from './course-lesson-videos-list.component';

describe('CourseLessonVideosListComponent', () => {
  let component: CourseLessonVideosListComponent;
  let fixture: ComponentFixture<CourseLessonVideosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLessonVideosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonVideosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
