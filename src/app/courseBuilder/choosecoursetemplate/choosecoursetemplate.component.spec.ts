import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosecoursetemplateComponent } from './choosecoursetemplate.component';

describe('ChoosecoursetemplateComponent', () => {
  let component: ChoosecoursetemplateComponent;
  let fixture: ComponentFixture<ChoosecoursetemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosecoursetemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosecoursetemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
