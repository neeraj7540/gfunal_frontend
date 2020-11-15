import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditModuleComponent } from './course-edit-module.component';

describe('CourseEditModuleComponent', () => {
  let component: CourseEditModuleComponent;
  let fixture: ComponentFixture<CourseEditModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEditModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
