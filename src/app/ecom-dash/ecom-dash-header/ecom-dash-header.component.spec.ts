import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomDashHeaderComponent } from './ecom-dash-header.component';

describe('EcomDashHeaderComponent', () => {
  let component: EcomDashHeaderComponent;
  let fixture: ComponentFixture<EcomDashHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomDashHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomDashHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
