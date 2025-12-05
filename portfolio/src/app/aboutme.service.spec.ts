import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import { AboutmeService } from './aboutme.service';

describe('AboutmeService', () => {
  let service: AboutmeService;

  beforeEach(() => {
    if (!TestBed.platform) {
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting(),
      );
    }
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutmeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
