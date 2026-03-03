import { Component } from '@angular/core';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

/**
 * Navigation bar component
 */
@Component({
  selector: 'app-nav',
  imports: [ThemeSwitcherComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {}
