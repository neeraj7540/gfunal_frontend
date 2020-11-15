import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelContactsComponent } from './funnel-contacts.component';

describe('FunnelContactsComponent', () => {
  let component: FunnelContactsComponent;
  let fixture: ComponentFixture<FunnelContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
