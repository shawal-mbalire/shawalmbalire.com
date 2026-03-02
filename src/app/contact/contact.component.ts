import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Contact component with contact information and form
 */
@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  readonly formStatus = signal<FormStatus>('idle');
  readonly formData = signal({ name: '', email: '', message: '' });

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidName(name: string): boolean {
    return name.trim().length >= 2;
  }

  canSubmit(): boolean {
    const data = this.formData();
    return this.isValidName(data.name) && 
           this.isValidEmail(data.email) && 
           data.message.trim().length > 0;
  }

  onSubmit(): void {
    // Only submit if all fields are valid
    if (!this.canSubmit()) {
      return;
    }

    this.formStatus.set('submitting');

    // Simulate form submission
    setTimeout(() => {
      // In production, replace with actual API call
      const success = true;
      this.formStatus.set(success ? 'success' : 'error');

      if (success) {
        this.formData.set({ name: '', email: '', message: '' });
      }

      // Reset status after 5 seconds
      setTimeout(() => this.formStatus.set('idle'), 5000);
    }, 1000);
  }

  onInputChange(field: 'name' | 'email' | 'message', value: string): void {
    this.formData.update(data => ({ ...data, [field]: value }));
  }
}
