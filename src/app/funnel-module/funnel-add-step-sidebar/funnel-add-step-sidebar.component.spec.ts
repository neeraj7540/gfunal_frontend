import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelAddStepSidebarComponent } from './funnel-add-step-sidebar.component';

describe('FunnelAddStepSidebarComponent', () => {
  let component: FunnelAddStepSidebarComponent;
  let fixture: ComponentFixture<FunnelAddStepSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelAddStepSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelAddStepSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
