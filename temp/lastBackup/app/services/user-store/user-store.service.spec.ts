import { TestBed, inject } from '@angular/core/testing';

import { UserStoreService } from './user-store.service';

describe('UserStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserStoreService]
    });
  });

  it('should be created', inject([UserStoreService], (service: UserStoreService) => {
    expect(service).toBeTruthy();
  }));
});
