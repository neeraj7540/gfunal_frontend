import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateDashboardComponent } from './affiliate-dashboard.component';

describe('AffiliateDashboardComponent', () => {
  let component: AffiliateDashboardComponent;
  let fixture: ComponentFixture<AffiliateDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliateDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
