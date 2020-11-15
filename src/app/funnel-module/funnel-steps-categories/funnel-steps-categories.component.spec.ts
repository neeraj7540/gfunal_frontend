import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelStepsCategoriesComponent } from './funnel-steps-categories.component';

describe('FunnelStepsCategoriesComponent', () => {
  let component: FunnelStepsCategoriesComponent;
  let fixture: ComponentFixture<FunnelStepsCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelStepsCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelStepsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
