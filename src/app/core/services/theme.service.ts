import { Injectable, signal, effect, inject } from '@angular/core';
import { CookieService } from './cookie.service';

export type ThemeKey =
  | 'dark-theme'
  | 'catppuccin-theme'
  | 'solarized-light-theme'
  | 'solarized-dark-theme';

/**
 * Service to manage application theme with localStorage persistence
 * Uses Angular 17+ features: inject(), signal(), effect()
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageService = inject(CookieService);
  private isInitialized = false;

  readonly availableThemes: ReadonlyArray<{ label: string; value: ThemeKey }> = [
    { label: 'Solarized Light', value: 'solarized-light-theme' },
    { label: 'Dark', value: 'dark-theme' },
    { label: 'Catppuccin Mocha', value: 'catppuccin-theme' },
    { label: 'Solarized Dark', value: 'solarized-dark-theme' },
  ];

  private readonly allThemeClasses = this.availableThemes.map(t => t.value);
  private readonly activeThemeSignal = signal<ThemeKey>('solarized-light-theme');
  readonly activeTheme = this.activeThemeSignal.asReadonly();

  /**
   * Initialize theme from localStorage (called by APP_INITIALIZER)
   */
  initializeTheme(): void {
    if (this.isInitialized || typeof window === 'undefined') {
      return;
    }
    
    this.isInitialized = true;
    
    // Get saved theme from localStorage
    const saved = this.storageService.get() as ThemeKey | null;
    
    // Respect system dark mode preference if no saved theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: ThemeKey = saved ?? (prefersDark ? 'dark-theme' : 'solarized-light-theme');
    
    this.activeThemeSignal.set(initial);
    this.applyTheme(initial);
  }

  constructor() {
    // Apply theme when it changes
    effect(() => {
      const theme = this.activeThemeSignal();
      this.applyTheme(theme);
    });
  }

  private applyTheme(theme: ThemeKey): void {
    if (typeof document === 'undefined') return;
    
    // Remove all theme classes
    document.documentElement.classList.remove(...this.allThemeClasses);
    
    // Add the new theme class
    document.documentElement.classList.add(theme);
    
    // Force reflow to ensure class change is applied (critical for iOS Safari)
    void document.documentElement.offsetHeight;
    
    // Save to localStorage
    this.storageService.set(theme);
  }

  setActiveTheme(theme: ThemeKey): void {
    this.activeThemeSignal.set(theme);
  }

  getActiveTheme(): ThemeKey {
    return this.activeThemeSignal();
  }
}
