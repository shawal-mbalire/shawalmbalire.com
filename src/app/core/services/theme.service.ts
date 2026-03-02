import { Injectable, signal, effect, inject } from '@angular/core';
import { CookieService } from './cookie.service';

export type ThemeKey =
  | 'dark-theme'
  | 'catppuccin-theme'
  | 'solarized-light-theme'
  | 'solarized-dark-theme';

/**
 * Service to manage application theme with cookie persistence
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly cookieService = inject(CookieService);
  private readonly COOKIE_NAME = 'theme_preference';

  readonly availableThemes: ReadonlyArray<{ label: string; value: ThemeKey }> = [
    { label: 'Solarized Light', value: 'solarized-light-theme' },
    { label: 'Dark', value: 'dark-theme' },
    { label: 'Catppuccin Mocha', value: 'catppuccin-theme' },
    { label: 'Solarized Dark', value: 'solarized-dark-theme' },
  ];

  private readonly allThemeClasses = this.availableThemes.map(t => t.value);
  private readonly activeThemeSignal = signal<ThemeKey>('solarized-light-theme');
  readonly activeTheme = this.activeThemeSignal.asReadonly();

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = this.cookieService.get(this.COOKIE_NAME) as ThemeKey | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial: ThemeKey = saved ?? (prefersDark ? 'dark-theme' : 'solarized-light-theme');
      this.activeThemeSignal.set(initial);
    }

    effect(() => {
      const theme = this.activeThemeSignal();
      if (typeof window !== 'undefined') {
        document.documentElement.classList.remove(...this.allThemeClasses);
        document.documentElement.classList.add(theme);
        // Store theme preference in cookie (1 year expiry)
        this.cookieService.set(this.COOKIE_NAME, theme, 365 * 24 * 60 * 60);
      }
    });
  }

  setActiveTheme(theme: ThemeKey): void {
    this.activeThemeSignal.set(theme);
  }

  getActiveTheme(): ThemeKey {
    return this.activeThemeSignal();
  }
}
