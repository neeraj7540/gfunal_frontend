import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseBlogTemplateComponent } from './choose-blog-template.component';

describe('ChooseBlogTemplateComponent', () => {
  let component: ChooseBlogTemplateComponent;
  let fixture: ComponentFixture<ChooseBlogTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseBlogTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseBlogTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
