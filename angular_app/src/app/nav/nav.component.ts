import { Component, viewChild, ElementRef, afterNextRender } from '@angular/core';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

/**
 * Navigation component with Angular 17+ signal queries
 * Uses viewChild() instead of @ViewChild
 */
@Component({
  selector: 'app-nav',
  imports: [ThemeSwitcherComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  // Signal-based view child query (Angular 17.1+)
  private readonly headerElement = viewChild<ElementRef<HTMLElement>>('header');
  
  constructor() {
    // afterNextRender hook (Angular 17+)
    afterNextRender(() => {
      // Initialize header behavior
      const header = this.headerElement()?.nativeElement;
      if (header) {
        // Add scroll listener for header styling
        const handleScroll = () => {
          if (window.scrollY > 50) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
      }

      // Active link tracking logic
      this.setupActiveLinkObserver();
    });
  }

  private setupActiveLinkObserver(): void {
    const sections = document.querySelectorAll('main[id], section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    const options = {
      root: null,
      threshold: 0.3,
      rootMargin: '-10% 0px -70% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entries[0].isIntersecting) {
          // If multiple are intersecting, the observer logic might be tricky, 
          // but usually one is dominant.
        }
        
        if (entry.isIntersecting) {
          let id = entry.target.getAttribute('id');
          // Map projects to about link
          if (id === 'projects') id = 'about';
          
          navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active-link');
            }
          });
        }
      });
    }, options);

    sections.forEach(section => observer.observe(section));
  }
}
