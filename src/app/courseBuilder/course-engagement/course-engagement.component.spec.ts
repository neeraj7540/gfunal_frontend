import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEngagementComponent } from './course-engagement.component';

describe('CourseEngagementComponent', () => {
  let component: CourseEngagementComponent;
  let fixture: ComponentFixture<CourseEngagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEngagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
