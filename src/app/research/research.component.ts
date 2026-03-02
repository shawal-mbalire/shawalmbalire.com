import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchService } from '../core/services/research.service';
import { SectionComponent } from '../shared/components/section/section.component';

/**
 * Research page component displaying research timeline
 */
@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule, SectionComponent],
  templateUrl: './research.component.html',
  styleUrl: './research.component.css'
})
export class ResearchComponent {
  private readonly researchService = inject(ResearchService);
  
  readonly researchByYear = this.researchService.researchByYear;
  readonly isLoading = this.researchService.isLoading;
  readonly hasError = this.researchService.hasError;
  
  get years(): number[] {
    return this.researchService.getYears();
  }
}
