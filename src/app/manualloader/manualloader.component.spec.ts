import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualloaderComponent } from './manualloader.component';

describe('ManualloaderComponent', () => {
  let component: ManualloaderComponent;
  let fixture: ComponentFixture<ManualloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
