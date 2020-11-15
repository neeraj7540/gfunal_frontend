import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTemplatesComponent } from './course-templates.component';

describe('CourseTemplatesComponent', () => {
  let component: CourseTemplatesComponent;
  let fixture: ComponentFixture<CourseTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
