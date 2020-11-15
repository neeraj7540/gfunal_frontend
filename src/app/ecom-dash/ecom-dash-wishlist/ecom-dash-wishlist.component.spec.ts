import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomDashWishlistComponent } from './ecom-dash-wishlist.component';

describe('EcomDashWishlistComponent', () => {
  let component: EcomDashWishlistComponent;
  let fixture: ComponentFixture<EcomDashWishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomDashWishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomDashWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
