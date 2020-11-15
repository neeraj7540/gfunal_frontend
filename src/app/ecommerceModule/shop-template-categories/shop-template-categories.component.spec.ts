import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTemplateCategoriesComponent } from './shop-template-categories.component';

describe('ShopTemplateCategoriesComponent', () => {
  let component: ShopTemplateCategoriesComponent;
  let fixture: ComponentFixture<ShopTemplateCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopTemplateCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopTemplateCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
