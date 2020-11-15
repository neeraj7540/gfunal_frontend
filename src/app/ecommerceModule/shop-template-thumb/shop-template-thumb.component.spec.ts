import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTemplateThumbComponent } from './shop-template-thumb.component';

describe('ShopTemplateThumbComponent', () => {
  let component: ShopTemplateThumbComponent;
  let fixture: ComponentFixture<ShopTemplateThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopTemplateThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopTemplateThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
