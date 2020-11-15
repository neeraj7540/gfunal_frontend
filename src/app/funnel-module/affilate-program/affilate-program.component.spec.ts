import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffilateProgramComponent } from './affilate-program.component';

describe('AffilateProgramComponent', () => {
  let component: AffilateProgramComponent;
  let fixture: ComponentFixture<AffilateProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffilateProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffilateProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
