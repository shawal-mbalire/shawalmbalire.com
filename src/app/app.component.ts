import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ThemeService } from './core/services';
import { NavComponent } from './nav';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { ExperienceComponent } from './experience';
import { ResearchComponent } from './research';
import { ContactComponent } from './contact';
import { FooterComponent } from './footer';

/**
 * Root app component - main layout container
 * Handles SEO meta tags and title updates for hybrid rendering
 */
@Component({
  selector: 'app-root',
  imports: [
    NavComponent,
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    ResearchComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Theme is initialized by ThemeService constructor
    
    // Set default meta tags
    this.setDefaultMetaTags();
    
    // Update meta tags on route change
    this.updateMetaTagsOnNavigation();
  }

  private setDefaultMetaTags(): void {
    this.meta.addTags([
      { name: 'author', content: 'Shawal Mbalire' },
      { name: 'keywords', content: 'Electrical Engineering, Software Engineering, IoT, Arduino, PCB Design, Makerere University, Embedded Systems, Automation, Python, Go, Docker' },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'English' },
      { name: 'theme-color', content: '#1a1a1a' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Shawal Mbalire Portfolio' }
    ]);
  }

  private updateMetaTagsOnNavigation(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.route.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data['title']) {
              return child.snapshot.data;
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((data: any) => {
        if (data) {
          this.title.setTitle(data['title'] || 'Shawal Mbalire - Electrical & Software Engineering Student');
          this.meta.updateTag({ name: 'description', content: data['description'] || 'Portfolio of Shawal Mbalire - Electrical Engineering student specializing in IoT, Automation, and Software Development' });
          this.meta.updateTag({ property: 'og:title', content: data['title'] });
          this.meta.updateTag({ property: 'og:description', content: data['description'] });
          this.meta.updateTag({ name: 'twitter:title', content: data['title'] });
          this.meta.updateTag({ name: 'twitter:description', content: data['description'] });
        }
      });
  }
}
