import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
    <app-section id="projects" label="Projects" title="My Projects">
      <p class="projects-intro">
        Explore some of my personal projects and applications I've developed.
      </p>

      @if (featuredProjects().length > 0) {
        <div class="featured-banner">
          <span class="featured-label">Featured</span>
          <div class="featured-grid">
            @for (project of featuredProjects(); track project.id) {
              <app-project-entry [project]="project" [featured]="true"></app-project-entry>
            }
          </div>
        </div>
      }

      <div class="projects-grid">
        @if (isLoading()) {
          @for (skeleton of [1, 2, 3]; track skeleton) {
            <div class="project-skeleton">
              <div class="skeleton skeleton--title"></div>
              <div class="skeleton skeleton--subtitle"></div>
              <div class="skeleton skeleton--text"></div>
              <div class="skeleton skeleton--text skeleton--text-short"></div>
            </div>
          }
        } @else if (hasError()) {
          <div class="projects-error">
            <p>{{ errorMessage() }}</p>
          </div>
        } @else {
          @for (project of projects(); track project.id) {
            <app-project-entry [project]="project"></app-project-entry>
          }
        }
      </div>
    </app-section>
  `,
  styles: [`
    .projects-intro {
      margin-bottom: 2rem;
      font-size: 1.1rem;
      color: var(--text-secondary);
      max-width: 800px;
    }

    .featured-banner {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 16px;
    }

    .featured-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--primary-color, #8b5cf6);
      margin-bottom: 1rem;
    }

    .featured-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
    }

    .project-skeleton {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 1.5rem;
      height: 250px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .projects-error {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem;
      background: rgba(255, 0, 0, 0.05);
      border-radius: 12px;
      color: #ff5252;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  private readonly projectService = inject(ProjectService);

  readonly projects = this.projectService.data;
  readonly isLoading = this.projectService.isLoading;
  readonly hasError = this.projectService.hasError;
  readonly errorMessage = this.projectService.errorMessage;
  readonly featuredProjects = this.projectService.featuredProjects;
}
