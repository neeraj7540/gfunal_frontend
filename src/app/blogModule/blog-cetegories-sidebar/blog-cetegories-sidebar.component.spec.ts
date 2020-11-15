import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCetegoriesSidebarComponent } from './blog-cetegories-sidebar.component';

describe('BlogCetegoriesSidebarComponent', () => {
  let component: BlogCetegoriesSidebarComponent;
  let fixture: ComponentFixture<BlogCetegoriesSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogCetegoriesSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCetegoriesSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
