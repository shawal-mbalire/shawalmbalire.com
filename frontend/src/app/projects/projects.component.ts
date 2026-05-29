import { ChangeDetectionStrategy, Component, inject, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../core/services/project.service';
import { ProjectEntryComponent } from './project-entry.component';
import { SectionComponent } from '../shared/components/section';

/**
 * Projects component displaying a list of projects
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectEntryComponent, SectionComponent],
  template: `
    @if (isFullSection()) {
      <app-section id="projects" label="Projects" title="My Projects">
        <ng-container *ngTemplateOutlet="projectsContent"></ng-container>
      </app-section>
    } @else {
      <div id="projects" class="projects-list-only">
        <h3 class="section-subtitle">My Projects</h3>
        <ng-container *ngTemplateOutlet="projectsContent"></ng-container>
      </div>
    }

    <ng-template #projectsContent>
      <p class="projects-intro">
        Explore some of my personal projects and applications I've developed.
      </p>

      @if (featuredProjects().length > 0) {
        <div class="featured-section">
          <div class="featured-grid">
            @for (project of featuredProjects(); track project.id) {
              <app-project-entry [project]="project" [featured]="true"></app-project-entry>
            }
          </div>
        </div>
      }

      @if (regularProjects().length > 0) {
        <div class="projects-grid">
          @for (project of regularProjects(); track project.id) {
            <app-project-entry [project]="project"></app-project-entry>
          }
        </div>
      }

      @if (isLoading()) {
        <div class="projects-grid">
          @for (skeleton of [1, 2, 3]; track skeleton) {
            <div class="project-skeleton">
              <div class="skeleton skeleton--title"></div>
              <div class="skeleton skeleton--subtitle"></div>
              <div class="skeleton skeleton--text"></div>
              <div class="skeleton skeleton--text skeleton--text-short"></div>
            </div>
          }
        </div>
      } @else if (hasError()) {
        <div class="projects-error">
          <p>{{ errorMessage() }}</p>
        </div>
      }
    </ng-template>
  `,
  styles: [`
    .projects-intro {
      margin-bottom: 2.5rem;
      font-size: 1.1rem;
      color: var(--fontColor);
      opacity: 0.9;
      max-width: 800px;
      line-height: 1.6;
    }

    .projects-list-only {
      width: 100%;
      max-width: 900px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .section-subtitle {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--fontColor);
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .featured-section {
      margin-bottom: 3rem;
      width: 100%;
    }

    .featured-grid, .projects-grid {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      width: 100%;
      max-width: 900px;
    }

    .project-skeleton {
      background: var(--primaryColor);
      border: 2px solid var(--secondaryColor);
      border-radius: 12px;
      padding: 1.5rem;
      height: 200px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .projects-error {
      width: 100%;
      max-width: 800px;
      padding: 2rem;
      text-align: center;
      background: var(--primaryColor);
      border: 2px solid var(--secondaryColor);
      border-radius: 12px;
      color: var(--fontColor);
    }

    /* Skeleton animation from research component */
    .skeleton {
      background: linear-gradient(
        90deg,
        rgba(128, 128, 128, 0.1) 0%,
        rgba(128, 128, 128, 0.2) 50%,
        rgba(128, 128, 128, 0.1) 100%
      );
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s ease-in-out infinite;
      border-radius: 4px;
    }

    @keyframes skeleton-loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .skeleton--title { height: 1.5rem; width: 60%; }
    .skeleton--subtitle { height: 1rem; width: 40%; }
    .skeleton--text { height: 0.875rem; width: 100%; }
    .skeleton--text-short { width: 80%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  private readonly projectService = inject(ProjectService);
  
  readonly isFullSection = input<boolean>(true);

  readonly projects = this.projectService.data;
  readonly isLoading = this.projectService.isLoading;
  readonly hasError = this.projectService.hasError;
  readonly errorMessage = this.projectService.errorMessage;
  readonly featuredProjects = this.projectService.featuredProjects;
  
  readonly regularProjects = computed(() => 
    this.projects()?.filter(p => !p.isFeatured) ?? []
  );
}
