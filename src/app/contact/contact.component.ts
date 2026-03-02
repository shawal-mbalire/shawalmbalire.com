import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  onSubmit(): void {
    alert('Thank you for your message! I\'ll get back to you soon.');
  }
}
