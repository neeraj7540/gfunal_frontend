import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelCreateContactComponent } from './funnel-create-contact.component';

describe('FunnelCreateContactComponent', () => {
  let component: FunnelCreateContactComponent;
  let fixture: ComponentFixture<FunnelCreateContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelCreateContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelCreateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
