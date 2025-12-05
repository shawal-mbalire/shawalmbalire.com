import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import { ExperienceService } from './experience.service';

describe('ExperienceService', () => {
  let service: ExperienceService;

  beforeEach(() => {
    if (!TestBed.platform) {
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting(),
      );
    }
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
