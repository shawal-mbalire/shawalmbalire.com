import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from './experience/experience.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    NavComponent,
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // The theme will be set based on the user's preference when the service is initialized
  }
}
