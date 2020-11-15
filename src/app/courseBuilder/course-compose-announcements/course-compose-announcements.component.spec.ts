import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseComposeAnnouncementsComponent } from './course-compose-announcements.component';

describe('CourseComposeAnnouncementsComponent', () => {
  let component: CourseComposeAnnouncementsComponent;
  let fixture: ComponentFixture<CourseComposeAnnouncementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseComposeAnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComposeAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
