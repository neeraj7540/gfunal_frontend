import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffilateProgramDashboardComponent } from './affilate-program-dashboard.component';

describe('AffilateProgramDashboardComponent', () => {
  let component: AffilateProgramDashboardComponent;
  let fixture: ComponentFixture<AffilateProgramDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffilateProgramDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffilateProgramDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
