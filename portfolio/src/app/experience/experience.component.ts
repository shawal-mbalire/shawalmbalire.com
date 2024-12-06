import { Component, Input } from '@angular/core';
import { WorkEntryComponent } from "../work-entry/work-entry.component";
import { WorkEntry } from "../work-entry"

@Component({
  selector: 'app-experience',
  imports: [
    WorkEntryComponent,
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  @Input() work-entry:WorkEntry;
}
