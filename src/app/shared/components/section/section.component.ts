import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Section component for consistent page sections
 * 
 * @example
 * ```html
 * <app-section label="Welcome" title="Home Page">
 *   <p>Section content</p>
 * </app-section>
 * ```
 */
@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section [id]="id" class="section">
      <div class="section__content">
        @if (label) {
          <span class="section__label">{{ label }}</span>
        }
        @if (title) {
          <h2 class="section__title">{{ title }}</h2>
        }
        <ng-content></ng-content>
      </div>
    </section>
  `,
  styleUrl: './section.component.css'
})
export class SectionComponent {
  /** Section ID for anchor links */
  @Input() id = '';
  
  /** Optional label above the title */
  @Input() label = '';
  
  /** Section title */
  @Input() title = '';
}
