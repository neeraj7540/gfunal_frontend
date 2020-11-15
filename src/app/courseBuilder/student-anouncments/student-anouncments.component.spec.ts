import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAnouncmentsComponent } from './student-anouncments.component';

describe('StudentAnouncmentsComponent', () => {
  let component: StudentAnouncmentsComponent;
  let fixture: ComponentFixture<StudentAnouncmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAnouncmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAnouncmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
