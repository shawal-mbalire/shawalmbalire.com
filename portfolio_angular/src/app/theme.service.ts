import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeTheme!: string;

  constructor() {
    if (typeof window !== 'undefined') {
      this.detectPreferredTheme();
    }
  }

  private detectPreferredTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.activeTheme = prefersDark ? 'dark-theme' : 'light-theme';
    document.body.className = this.activeTheme;
  }

  setActiveTheme(theme: string) {
    this.activeTheme = theme;
    document.body.className = theme;
  }

  getActiveTheme(): string {
    return this.activeTheme;
  }
}
