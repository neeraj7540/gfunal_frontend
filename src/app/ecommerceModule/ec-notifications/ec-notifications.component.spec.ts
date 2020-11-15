import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcNotificationsComponent } from './ec-notifications.component';

describe('EcNotificationsComponent', () => {
  let component: EcNotificationsComponent;
  let fixture: ComponentFixture<EcNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
