import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpListsComponent } from './lp-lists.component';

describe('LpListsComponent', () => {
  let component: LpListsComponent;
  let fixture: ComponentFixture<LpListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
