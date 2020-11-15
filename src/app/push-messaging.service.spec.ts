import { TestBed } from '@angular/core/testing';

import { PushMessagingService } from './push-messaging.service';

describe('PushMessagingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PushMessagingService = TestBed.get(PushMessagingService);
    expect(service).toBeTruthy();
  });
});
