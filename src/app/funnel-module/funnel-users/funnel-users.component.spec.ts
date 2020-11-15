import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelUsersComponent } from './funnel-users.component';

describe('FunnelUsersComponent', () => {
  let component: FunnelUsersComponent;
  let fixture: ComponentFixture<FunnelUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
