import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogTemplate1Component } from './blog-template1.component';

describe('BlogTemplate1Component', () => {
  let component: BlogTemplate1Component;
  let fixture: ComponentFixture<BlogTemplate1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogTemplate1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogTemplate1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
