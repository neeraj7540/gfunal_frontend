import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelSalesComponent } from './funnel-sales.component';

describe('FunnelSalesComponent', () => {
  let component: FunnelSalesComponent;
  let fixture: ComponentFixture<FunnelSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
