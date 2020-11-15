import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffilateReferredAccountsComponent } from './affilate-referred-accounts.component';

describe('AffilateReferredAccountsComponent', () => {
  let component: AffilateReferredAccountsComponent;
  let fixture: ComponentFixture<AffilateReferredAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffilateReferredAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffilateReferredAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
