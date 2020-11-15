import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSignupOtpComponent } from './student-signup-otp.component';

describe('StudentSignupOtpComponent', () => {
  let component: StudentSignupOtpComponent;
  let fixture: ComponentFixture<StudentSignupOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSignupOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSignupOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
