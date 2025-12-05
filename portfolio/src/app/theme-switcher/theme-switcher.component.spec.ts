import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import { ThemeSwitcherComponent } from './theme-switcher.component';
import { ThemeService } from '../theme.service';
import { signal } from '@angular/core';

describe('ThemeSwitcherComponent', () => {
  let component: ThemeSwitcherComponent;
  let fixture: ComponentFixture<ThemeSwitcherComponent>;

  beforeEach(async () => {
    if (!TestBed.platform) {
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting(),
      );
    }
    await TestBed.configureTestingModule({
      imports: [ThemeSwitcherComponent],
      providers: [
        {
          provide: ThemeService,
          useValue: {
            activeTheme: signal('light-theme').asReadonly(),
            setActiveTheme: () => {}
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
