import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomDashOrderlistComponent } from './ecom-dash-orderlist.component';

describe('EcomDashOrderlistComponent', () => {
  let component: EcomDashOrderlistComponent;
  let fixture: ComponentFixture<EcomDashOrderlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomDashOrderlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomDashOrderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
