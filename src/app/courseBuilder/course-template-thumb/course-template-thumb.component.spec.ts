import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTemplateThumbComponent } from './course-template-thumb.component';

describe('CourseTemplateThumbComponent', () => {
  let component: CourseTemplateThumbComponent;
  let fixture: ComponentFixture<CourseTemplateThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTemplateThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTemplateThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
