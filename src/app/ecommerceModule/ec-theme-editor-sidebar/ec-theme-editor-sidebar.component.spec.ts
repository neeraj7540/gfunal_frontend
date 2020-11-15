import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcThemeEditorSidebarComponent } from './ec-theme-editor-sidebar.component';

describe('EcThemeEditorSidebarComponent', () => {
  let component: EcThemeEditorSidebarComponent;
  let fixture: ComponentFixture<EcThemeEditorSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcThemeEditorSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcThemeEditorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
