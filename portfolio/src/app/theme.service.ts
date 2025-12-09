import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeThemeSignal = signal<string>('light-theme');
  activeTheme = this.activeThemeSignal.asReadonly();

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('activeTheme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = saved ?? (prefersDark ? 'dark-theme' : 'light-theme');
      this.activeThemeSignal.set(initial);
    }

    effect(() => {
      const theme = this.activeThemeSignal();
      if (typeof window !== 'undefined') {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(theme);
        localStorage.setItem('activeTheme', theme);
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
