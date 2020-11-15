import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelsPagesComponent } from './funnels-pages.component';

describe('FunnelsPagesComponent', () => {
  let component: FunnelsPagesComponent;
  let fixture: ComponentFixture<FunnelsPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelsPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelsPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
