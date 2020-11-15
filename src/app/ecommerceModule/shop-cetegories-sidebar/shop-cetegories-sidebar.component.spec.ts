import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCetegoriesSidebarComponent } from './shop-cetegories-sidebar.component';

describe('ShopCetegoriesSidebarComponent', () => {
  let component: ShopCetegoriesSidebarComponent;
  let fixture: ComponentFixture<ShopCetegoriesSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCetegoriesSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCetegoriesSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
