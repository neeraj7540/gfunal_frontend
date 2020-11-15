import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelSubHeaderComponent } from './funnel-sub-header.component';

describe('FunnelSubHeaderComponent', () => {
  let component: FunnelSubHeaderComponent;
  let fixture: ComponentFixture<FunnelSubHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelSubHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
