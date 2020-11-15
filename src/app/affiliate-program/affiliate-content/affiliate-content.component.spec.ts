import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateContentComponent } from './affiliate-content.component';

describe('AffiliateContentComponent', () => {
  let component: AffiliateContentComponent;
  let fixture: ComponentFixture<AffiliateContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliateContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
