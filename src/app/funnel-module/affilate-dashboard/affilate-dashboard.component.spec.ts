import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffilateDashboardComponent } from './affilate-dashboard.component';

describe('AffilateDashboardComponent', () => {
  let component: AffilateDashboardComponent;
  let fixture: ComponentFixture<AffilateDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffilateDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffilateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
