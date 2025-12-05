import '../../../test-setup';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { WorkEntryService } from './work-entry.service';

describe('WorkEntryService', () => {
  let service: WorkEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WorkEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
