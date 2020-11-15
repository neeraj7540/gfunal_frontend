import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTemplateCategoriesComponent } from './course-template-categories.component';

describe('CourseTemplateCategoriesComponent', () => {
  let component: CourseTemplateCategoriesComponent;
  let fixture: ComponentFixture<CourseTemplateCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTemplateCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTemplateCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
