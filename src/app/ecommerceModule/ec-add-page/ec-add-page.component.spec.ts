import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcAddPageComponent } from './ec-add-page.component';

describe('EcAddPageComponent', () => {
  let component: EcAddPageComponent;
  let fixture: ComponentFixture<EcAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcAddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
