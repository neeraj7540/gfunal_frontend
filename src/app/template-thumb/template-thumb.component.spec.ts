import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateThumbComponent } from './template-thumb.component';

describe('TemplateThumbComponent', () => {
  let component: TemplateThumbComponent;
  let fixture: ComponentFixture<TemplateThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
