import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogTemplateThumbComponent } from './blog-template-thumb.component';

describe('BlogTemplateThumbComponent', () => {
  let component: BlogTemplateThumbComponent;
  let fixture: ComponentFixture<BlogTemplateThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogTemplateThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogTemplateThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
