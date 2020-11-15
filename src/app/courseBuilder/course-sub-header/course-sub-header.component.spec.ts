import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSubHeaderComponent } from './course-sub-header.component';

describe('CourseSubHeaderComponent', () => {
  let component: CourseSubHeaderComponent;
  let fixture: ComponentFixture<CourseSubHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSubHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
