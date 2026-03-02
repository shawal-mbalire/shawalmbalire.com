import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import { LogolookerComponent } from './logolooker.component';

describe('LogolookerComponent', () => {
  let component: LogolookerComponent;
  let fixture: ComponentFixture<LogolookerComponent>;

  beforeEach(async () => {
    if (!TestBed.platform) {
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting(),
      );
    }
    await TestBed.configureTestingModule({
      imports: [LogolookerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogolookerComponent);
    component = fixture.componentInstance;

    (Element.prototype as any).animate = () => ({
      play: () => {},
      pause: () => {},
      finish: () => {},
      cancel: () => {},
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
