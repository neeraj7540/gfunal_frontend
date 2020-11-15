import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomFooterComponent } from './ecom-footer.component';

describe('EcomFooterComponent', () => {
  let component: EcomFooterComponent;
  let fixture: ComponentFixture<EcomFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
