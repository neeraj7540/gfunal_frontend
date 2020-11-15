import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffilateWithdrawalsComponent } from './affilate-withdrawals.component';

describe('AffilateWithdrawalsComponent', () => {
  let component: AffilateWithdrawalsComponent;
  let fixture: ComponentFixture<AffilateWithdrawalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffilateWithdrawalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffilateWithdrawalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
