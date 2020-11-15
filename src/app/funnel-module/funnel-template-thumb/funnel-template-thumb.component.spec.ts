import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelTemplateThumbComponent } from './funnel-template-thumb.component';

describe('FunnelTemplateThumbComponent', () => {
  let component: FunnelTemplateThumbComponent;
  let fixture: ComponentFixture<FunnelTemplateThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelTemplateThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelTemplateThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
