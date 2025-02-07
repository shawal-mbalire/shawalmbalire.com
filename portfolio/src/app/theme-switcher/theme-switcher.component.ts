import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.css'
})
export class ThemeSwitcherComponent {
  constructor(private themeService: ThemeService) { }

  toggleTheme() {
    const activeTheme = this.themeService.getActiveTheme();
    const newTheme = activeTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.themeService.setActiveTheme(newTheme);
  }
}
