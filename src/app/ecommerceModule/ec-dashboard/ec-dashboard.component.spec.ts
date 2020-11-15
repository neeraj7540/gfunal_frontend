import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcDashboardComponent } from './ec-dashboard.component';

describe('EcDashboardComponent', () => {
  let component: EcDashboardComponent;
  let fixture: ComponentFixture<EcDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
