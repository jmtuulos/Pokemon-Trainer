import { TestBed } from '@angular/core/testing';

import { LoggedInUsersGuard } from './logged-in-users.guard';

describe('LoggedInUsersGuard', () => {
  let guard: LoggedInUsersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedInUsersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
