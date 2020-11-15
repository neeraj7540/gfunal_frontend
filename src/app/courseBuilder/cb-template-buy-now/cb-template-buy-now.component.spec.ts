import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbTemplateBuyNowComponent } from './cb-template-buy-now.component';

describe('CbTemplateBuyNowComponent', () => {
  let component: CbTemplateBuyNowComponent;
  let fixture: ComponentFixture<CbTemplateBuyNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbTemplateBuyNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbTemplateBuyNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
