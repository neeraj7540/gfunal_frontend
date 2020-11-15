import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelImportContactsComponent } from './funnel-import-contacts.component';

describe('FunnelImportContactsComponent', () => {
  let component: FunnelImportContactsComponent;
  let fixture: ComponentFixture<FunnelImportContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelImportContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelImportContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
