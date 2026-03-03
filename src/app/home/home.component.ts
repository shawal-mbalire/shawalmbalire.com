import { Component, signal } from '@angular/core';

/**
 * Home component displaying the hero section
 */
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly currentDate = new Date();
  readonly isWeekend = signal(/\b(0|6)\b/.test(this.currentDate.getDay().toString()));
  readonly isMorning = signal(/^([6-9]|1[0-1])$/.test(this.currentDate.getHours().toString()));
}
