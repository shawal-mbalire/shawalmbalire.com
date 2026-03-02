import { Component, OnInit, inject } from '@angular/core';
import { ThemeService } from './core/services';
import { NavComponent } from './nav';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { ExperienceComponent } from './experience';
import { ContactComponent } from './contact';
import { FooterComponent } from './footer';

/**
 * Root app component - main layout container
 */
@Component({
  selector: 'app-root',
  imports: [
    NavComponent,
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);

  ngOnInit(): void {
    // Theme is initialized by ThemeService constructor
  }
}
