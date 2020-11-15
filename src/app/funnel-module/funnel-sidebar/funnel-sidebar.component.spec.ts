import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelSidebarComponent } from './funnel-sidebar.component';

describe('FunnelSidebarComponent', () => {
  let component: FunnelSidebarComponent;
  let fixture: ComponentFixture<FunnelSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
