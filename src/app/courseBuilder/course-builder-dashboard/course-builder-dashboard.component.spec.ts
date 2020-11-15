import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBuilderDashboardComponent } from './course-builder-dashboard.component';

describe('CourseBuilderDashboardComponent', () => {
  let component: CourseBuilderDashboardComponent;
  let fixture: ComponentFixture<CourseBuilderDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseBuilderDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseBuilderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
