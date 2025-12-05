import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  onSubmit() {
    // Basic form submission - in a real app, you'd validate and send data
    alert('Thank you for your message! I\'ll get back to you soon.');
  }
}
