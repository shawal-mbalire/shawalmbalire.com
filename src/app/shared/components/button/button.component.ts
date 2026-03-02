import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable button component with consistent styling
 * 
 * @example
 * ```html
 * <app-button variant="primary" (click)="handleClick()">Click me</app-button>
 * <app-button variant="secondary" [disabled]="isLoading">Submit</app-button>
 * ```
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="buttonClass"
      [disabled]="disabled"
      [type]="type"
      (click)="onClick.emit($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  /** Button variant - controls the visual style */
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  
  /** Button size */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  /** Disable the button */
  @Input() disabled = false;
  
  /** Button type */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  
  /** Click event emitter */
  @Output() click = new EventEmitter<MouseEvent>();

  get buttonClass(): string {
    return `button button--${this.variant} button--${this.size}`;
  }

  onClick(event: MouseEvent): void {
    this.click.emit(event);
  }
}
