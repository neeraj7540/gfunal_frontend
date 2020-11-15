import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseShopTemplateComponent } from './choose-shop-template.component';

describe('ChooseShopTemplateComponent', () => {
  let component: ChooseShopTemplateComponent;
  let fixture: ComponentFixture<ChooseShopTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseShopTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseShopTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
