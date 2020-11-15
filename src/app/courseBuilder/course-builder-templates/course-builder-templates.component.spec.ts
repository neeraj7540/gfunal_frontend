import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBuilderTemplatesComponent } from './course-builder-templates.component';

describe('CourseBuilderTemplatesComponent', () => {
  let component: CourseBuilderTemplatesComponent;
  let fixture: ComponentFixture<CourseBuilderTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseBuilderTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseBuilderTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
