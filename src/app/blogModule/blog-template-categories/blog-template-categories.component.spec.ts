import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogTemplateCategoriesComponent } from './blog-template-categories.component';

describe('BlogTemplateCategoriesComponent', () => {
  let component: BlogTemplateCategoriesComponent;
  let fixture: ComponentFixture<BlogTemplateCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogTemplateCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogTemplateCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
