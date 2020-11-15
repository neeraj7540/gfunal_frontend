import { TestBed } from '@angular/core/testing';

import { StudentCourseDataService } from './student-course-data.service';

describe('StudentCourseDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentCourseDataService = TestBed.get(StudentCourseDataService);
    expect(service).toBeTruthy();
  });
});
