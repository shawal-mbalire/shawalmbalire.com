import 'zone.js';
import { vi } from 'vitest';

import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Mock browser APIs
vi.stubGlobal('matchMedia', (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {},
}));

(Element.prototype as any).animate = () => ({
  play: () => {},
  pause: () => {},
  finish: () => {},
  cancel: () => {},
});

// Mock IntersectionObserver globally
const IntersectionObserverMock = class IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.root = options?.root ?? null;
    this.rootMargin = options?.rootMargin ?? '';
    this.thresholds = options?.threshold ? (Array.isArray(options.threshold) ? options.threshold : [options.threshold]) : [];
  }
  
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
window.IntersectionObserver = IntersectionObserverMock;
global.IntersectionObserver = IntersectionObserverMock;