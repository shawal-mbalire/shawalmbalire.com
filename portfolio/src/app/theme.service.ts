import { Injectable, signal, effect } from '@angular/core';

export type ThemeKey =
  | 'light-theme'
  | 'dark-theme'
  | 'catppuccin-theme'
  | 'tokyonight-theme'
  | 'solarized-light-theme'
  | 'solarized-dark-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly availableThemes: ReadonlyArray<{ label: string; value: ThemeKey }>= [
    { label: 'Light (Default)', value: 'light-theme' },
    { label: 'Dark (Default)', value: 'dark-theme' },
    { label: 'Catppuccin', value: 'catppuccin-theme' },
    { label: 'Tokyo Night', value: 'tokyonight-theme' },
    { label: 'Solarized Light', value: 'solarized-light-theme' },
    { label: 'Solarized Dark', value: 'solarized-dark-theme' },
  ];

  private allThemeClasses = this.availableThemes.map(t => t.value);

  private activeThemeSignal = signal<ThemeKey>('light-theme');
  activeTheme = this.activeThemeSignal.asReadonly();

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('activeTheme') as ThemeKey | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial: ThemeKey = saved ?? (prefersDark ? 'dark-theme' : 'light-theme');
      this.activeThemeSignal.set(initial);
    }

    effect(() => {
      const theme = this.activeThemeSignal();
      if (typeof window !== 'undefined') {
        document.body.classList.remove(...this.allThemeClasses);
        document.body.classList.add(theme);
        localStorage.setItem('activeTheme', theme);
      }
    });
  }

  setActiveTheme(theme: ThemeKey) {
    this.activeThemeSignal.set(theme);
  }

  getActiveTheme(): ThemeKey {
    return this.activeThemeSignal();
  }
}
