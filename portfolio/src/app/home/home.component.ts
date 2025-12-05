import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Using regular expressions in templates (new Angular v21 feature)
  currentDate = new Date();
  isWeekend = signal(/\b(0|6)\b/.test(this.currentDate.getDay().toString())); // 0 = Sunday, 6 = Saturday
  isMorning = signal(/^([6-9]|1[0-1])$/.test(this.currentDate.getHours().toString())); // 6 AM - 11 AM
}
