import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAccessLevelsDetailsViewComponent } from './course-access-levels-details-view.component';

describe('CourseAccessLevelsDetailsViewComponent', () => {
  let component: CourseAccessLevelsDetailsViewComponent;
  let fixture: ComponentFixture<CourseAccessLevelsDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAccessLevelsDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAccessLevelsDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
