import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelContactsMapFieldsComponent } from './funnel-contacts-map-fields.component';

describe('FunnelContactsMapFieldsComponent', () => {
  let component: FunnelContactsMapFieldsComponent;
  let fixture: ComponentFixture<FunnelContactsMapFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelContactsMapFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelContactsMapFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
