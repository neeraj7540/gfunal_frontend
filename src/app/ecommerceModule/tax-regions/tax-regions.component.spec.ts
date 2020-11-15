import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxRegionsComponent } from './tax-regions.component';

describe('TaxRegionsComponent', () => {
  let component: TaxRegionsComponent;
  let fixture: ComponentFixture<TaxRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxRegionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
