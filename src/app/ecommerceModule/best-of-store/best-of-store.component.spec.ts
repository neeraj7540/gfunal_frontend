import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestOfStoreComponent } from './best-of-store.component';

describe('BestOfStoreComponent', () => {
  let component: BestOfStoreComponent;
  let fixture: ComponentFixture<BestOfStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestOfStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestOfStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
