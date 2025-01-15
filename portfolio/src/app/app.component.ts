import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from './experience/experience.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { LogolookerComponent } from "./logolooker/logolooker.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
    LogolookerComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';
}
