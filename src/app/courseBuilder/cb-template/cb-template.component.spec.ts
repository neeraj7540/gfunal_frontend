import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbTemplateComponent } from './cb-template.component';

describe('CbTemplateComponent', () => {
  let component: CbTemplateComponent;
  let fixture: ComponentFixture<CbTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
