import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    if (!TestBed.platform) {
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting(),
      );
    }
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have isLoading signal', () => {
    expect(service.isLoading).toBeDefined();
    expect(typeof service.isLoading).toBe('function');
  });

  it('should have hasError signal', () => {
    expect(service.hasError).toBeDefined();
    expect(typeof service.hasError).toBe('function');
  });

  it('should have data signal', () => {
    expect(service.data).toBeDefined();
    expect(typeof service.data).toBe('function');
  });

  it('should have featuredProjects computed signal', () => {
    expect(service.featuredProjects).toBeDefined();
    expect(typeof service.featuredProjects).toBe('function');
  });

  it('should expose getById from BaseListService', () => {
    expect(service.getById).toBeDefined();
    expect(typeof service.getById).toBe('function');
  });

  it('should expose getAll from BaseListService', () => {
    expect(service.getAll).toBeDefined();
    expect(typeof service.getAll).toBe('function');
  });

  it('should expose getCount from BaseListService', () => {
    expect(service.getCount).toBeDefined();
    expect(typeof service.getCount).toBe('function');
  });

  it('should expose isEmpty from BaseListService', () => {
    expect(service.isEmpty).toBeDefined();
    expect(typeof service.isEmpty).toBe('function');
  });
});
