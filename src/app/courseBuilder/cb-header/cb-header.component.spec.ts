import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbHeaderComponent } from './cb-header.component';

describe('CbHeaderComponent', () => {
  let component: CbHeaderComponent;
  let fixture: ComponentFixture<CbHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
