import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WorkEntryComponent } from '../work-entry/work-entry.component';
import { WorkEntryService } from '../core/services/work-entry.service';

/**
 * Experience component displaying work history
 * Uses WorkEntryService for data management
 */
@Component({
  selector: 'app-experience',
  imports: [WorkEntryComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent {
  private readonly workEntryService = inject(WorkEntryService);
  
  readonly workEntries = this.workEntryService.data;
  readonly isLoading = this.workEntryService.isLoading;
  readonly hasError = this.workEntryService.hasError;
}
