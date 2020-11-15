import { TestBed, async, inject } from '@angular/core/testing';

import { StudentAuthGuardGuard } from './student-auth-guard.guard';

describe('StudentAuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentAuthGuardGuard]
    });
  });

  it('should ...', inject([StudentAuthGuardGuard], (guard: StudentAuthGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
