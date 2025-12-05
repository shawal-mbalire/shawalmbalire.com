import { Component, resource } from '@angular/core';
import { WorkEntryComponent } from "../work-entry/work-entry.component";
import { WorkEntry } from '../core/models/workEntry';

@Component({
  selector: 'app-experience',
  imports: [
    WorkEntryComponent
],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  workEntriesResource = resource({
    loader: async () => {
      const response = await fetch('/work-entries.json');
      return await response.json() as WorkEntry[];
    },
  });
}
