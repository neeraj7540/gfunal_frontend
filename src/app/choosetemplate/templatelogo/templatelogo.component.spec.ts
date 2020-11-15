import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatelogoComponent } from './templatelogo.component';

describe('TemplatelogoComponent', () => {
  let component: TemplatelogoComponent;
  let fixture: ComponentFixture<TemplatelogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatelogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatelogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
