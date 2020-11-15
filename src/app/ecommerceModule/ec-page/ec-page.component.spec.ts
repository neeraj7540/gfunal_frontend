import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcPageComponent } from './ec-page.component';

describe('EcPageComponent', () => {
  let component: EcPageComponent;
  let fixture: ComponentFixture<EcPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
