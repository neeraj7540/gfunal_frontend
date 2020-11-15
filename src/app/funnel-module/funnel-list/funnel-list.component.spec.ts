import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelListComponent } from './funnel-list.component';

describe('FunnelListComponent', () => {
  let component: FunnelListComponent;
  let fixture: ComponentFixture<FunnelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
