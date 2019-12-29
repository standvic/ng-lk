import { TestBed, inject } from '@angular/core/testing';

import { LazyDataSource } from './lazy-data-source.service';

describe('LazyDataSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LazyDataSource]
    });
  });

  it('should be created', inject([LazyDataSource], (service: LazyDataSource) => {
    expect(service).toBeTruthy();
  }));
});
