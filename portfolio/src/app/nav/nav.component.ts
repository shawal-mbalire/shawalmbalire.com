import { Component } from '@angular/core';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

// import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [
    ThemeSwitcherComponent
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
