import { Component, inject } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Menu, MenuItem, MenuTrigger } from '../core/aria';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.css',
  imports: [Menu, MenuItem, MenuTrigger]
})
export class ThemeSwitcherComponent {
  themeService = inject(ThemeService);

  setTheme(theme: string) {
    this.themeService.setActiveTheme(theme);
  }

  toggleTheme() {
    const current = this.themeService.getActiveTheme();
    const next = current === 'dark-theme' ? 'light-theme' : 'dark-theme';
    this.themeService.setActiveTheme(next);
  }
}
