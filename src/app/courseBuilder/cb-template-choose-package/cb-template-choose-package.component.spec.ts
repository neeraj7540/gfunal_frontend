import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbTemplateChoosePackageComponent } from './cb-template-choose-package.component';

describe('CbTemplateChoosePackageComponent', () => {
  let component: CbTemplateChoosePackageComponent;
  let fixture: ComponentFixture<CbTemplateChoosePackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbTemplateChoosePackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbTemplateChoosePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
