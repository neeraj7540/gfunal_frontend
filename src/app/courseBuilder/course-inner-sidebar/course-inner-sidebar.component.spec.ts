import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInnerSidebarComponent } from './course-inner-sidebar.component';

describe('CourseInnerSidebarComponent', () => {
  let component: CourseInnerSidebarComponent;
  let fixture: ComponentFixture<CourseInnerSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseInnerSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInnerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
