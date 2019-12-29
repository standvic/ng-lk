import { TestBed, inject } from '@angular/core/testing';

import { RestClientService } from './rest-client.service';

describe('RestclientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestClientService]
    });
  });

  it('should be created', inject([RestClientService], (service: RestClientService) => {
    expect(service).toBeTruthy();
  }));
});
