import { Injectable, signal, effect } from '@angular/core';

export type ThemeKey =
  | 'dark-theme'
  | 'catppuccin-theme'
  | 'solarized-light-theme'
  | 'solarized-dark-theme';

/**
 * Service to manage application theme with localStorage persistence
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
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
      const saved = localStorage.getItem('activeTheme') as ThemeKey | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial: ThemeKey = saved ?? (prefersDark ? 'dark-theme' : 'solarized-light-theme');
      this.activeThemeSignal.set(initial);
    }

    effect(() => {
      const theme = this.activeThemeSignal();
      if (typeof window !== 'undefined') {
        document.documentElement.classList.remove(...this.allThemeClasses);
        document.documentElement.classList.add(theme);
        localStorage.setItem('activeTheme', theme);
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
