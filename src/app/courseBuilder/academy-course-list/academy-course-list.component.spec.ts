import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyCourseListComponent } from './academy-course-list.component';

describe('AcademyCourseListComponent', () => {
  let component: AcademyCourseListComponent;
  let fixture: ComponentFixture<AcademyCourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyCourseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
