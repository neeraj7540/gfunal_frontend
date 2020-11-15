import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcSidebarComponent } from './ec-sidebar.component';

describe('EcSidebarComponent', () => {
  let component: EcSidebarComponent;
  let fixture: ComponentFixture<EcSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
