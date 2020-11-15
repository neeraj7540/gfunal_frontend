import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosetemplateComponent } from './choosetemplate.component';

describe('ChoosetemplateComponent', () => {
  let component: ChoosetemplateComponent;
  let fixture: ComponentFixture<ChoosetemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosetemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosetemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
