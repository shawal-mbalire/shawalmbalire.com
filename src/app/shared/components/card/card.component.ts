import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable card component for containing content
 * 
 * @example
 * ```html
 * <app-card [hoverable]="true">
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </app-card>
 * ```
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClass">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './card.component.css'
})
export class CardComponent {
  /** Enable hover effect */
  @Input() hoverable = false;
  
  /** Remove padding from card */
  @Input() flush = false;
  
  /** Custom additional classes */
  @Input() class = '';

  get cardClass(): string {
    const classes = ['card'];
    
    if (this.hoverable) {
      classes.push('card--hoverable');
    }
    
    if (this.flush) {
      classes.push('card--flush');
    }
    
    if (this.class) {
      classes.push(this.class);
    }
    
    return classes.join(' ');
  }
}
