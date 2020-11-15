import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeAnnouncementComponent } from './compose-announcement.component';

describe('ComposeAnnouncementComponent', () => {
  let component: ComposeAnnouncementComponent;
  let fixture: ComponentFixture<ComposeAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
