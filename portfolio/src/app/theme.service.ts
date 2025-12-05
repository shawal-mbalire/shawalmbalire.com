import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeThemeSignal = signal<string>('light-theme');
  activeTheme = this.activeThemeSignal.asReadonly();

  constructor() {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.activeThemeSignal.set(prefersDark ? 'dark-theme' : 'light-theme');
    }

    effect(() => {
      const theme = this.activeThemeSignal();
      if (typeof window !== 'undefined') {
        document.body.className = theme;
      }
    });
  }

  setActiveTheme(theme: string) {
    this.activeThemeSignal.set(theme);
  }

  getActiveTheme(): string {
    return this.activeThemeSignal();
  }
}
