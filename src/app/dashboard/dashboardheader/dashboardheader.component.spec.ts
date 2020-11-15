import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardheaderComponent } from './dashboardheader.component';

describe('DashboardheaderComponent', () => {
  let component: DashboardheaderComponent;
  let fixture: ComponentFixture<DashboardheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
