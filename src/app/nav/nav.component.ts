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
    });
  }
}
