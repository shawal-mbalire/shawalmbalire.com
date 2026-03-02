import { Component, inject } from '@angular/core';
import { ThemeService, type ThemeKey } from '../core/services/theme.service';
import { Menu, MenuItem, MenuTrigger } from '../core/aria';

/**
 * Theme switcher component for changing application theme
 */
@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.css',
  imports: [Menu, MenuItem, MenuTrigger]
})
export class ThemeSwitcherComponent {
  readonly themeService = inject(ThemeService);

  setTheme(theme: ThemeKey): void {
    this.themeService.setActiveTheme(theme);
  }

  toggleTheme(): void {
    const current = this.themeService.getActiveTheme();
    const next = current === 'dark-theme' ? 'solarized-light-theme' : 'dark-theme';
    this.themeService.setActiveTheme(next);
  }
}
