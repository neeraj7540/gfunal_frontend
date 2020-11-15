import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditModuleSidebarComponent } from './course-edit-module-sidebar.component';

describe('CourseEditModuleSidebarComponent', () => {
  let component: CourseEditModuleSidebarComponent;
  let fixture: ComponentFixture<CourseEditModuleSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEditModuleSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditModuleSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
