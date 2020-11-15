import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAddModuleComponent } from './course-add-module.component';

describe('CourseAddModuleComponent', () => {
  let component: CourseAddModuleComponent;
  let fixture: ComponentFixture<CourseAddModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAddModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAddModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
