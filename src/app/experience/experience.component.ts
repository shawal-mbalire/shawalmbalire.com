import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { WorkEntryComponent } from '../work-entry/work-entry.component';
import { WorkEntry } from '../core/models/work-entry.model';

/**
 * Experience component displaying work history using resource API
 */
@Component({
  selector: 'app-experience',
  imports: [WorkEntryComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent {
  readonly workEntriesResource = resource({
    loader: async () => {
      const response = await fetch('/work-entries.json');
      return await response.json() as WorkEntry[];
    },
  });
}
