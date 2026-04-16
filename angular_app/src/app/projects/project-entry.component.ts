import { ChangeDetectionStrategy, Component, inject, Inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../core/models/project.model';

/**
 * Project entry component displaying individual project details
 */
@Component({
  selector: 'app-project-entry',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="project-entry" [class.project-entry--featured]="featured()">
      <div class="project-entry__content">
        @if (featured()) {
          <span class="featured-badge">Featured</span>
        }
        <h2 class="project-entry__title">{{ project().title }}</h2>
        @if (project().category) {
          <h3 class="project-entry__category">{{ project().category }}</h3>
        }
        @if (project().startDate || project().endDate) {
          <p class="project-entry__dates">
            @if (project().startDate) {
              <span>{{ project().startDate }}</span>
            }
            @if (project().startDate && project().endDate) {
              <span> → </span>
            }
            @if (project().endDate) {
              <span>{{ project().endDate }}</span>
            }
          </p>
        }
        <p class="project-entry__description">{{ project().description }}</p>

        <div class="project-entry__tags">
          @for (tech of project().techStack; track tech) {
            <span class="tag">{{ tech }}</span>
          }
        </div>
      </div>

      <div class="project-entry__actions">
        <button class="button" (click)="openDialog()" [attr.aria-label]="'Show more about ' + project().title">Show More</button>

        @if (project().links?.github) {
          <a [href]="project().links?.github" target="_blank" rel="noopener" class="button button--outline" aria-label="View source code on GitHub">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            Source
          </a>
        }
        @if (project().links?.website) {
          <a [href]="project().links?.website" target="_blank" rel="noopener" class="button button--secondary">
            Website
          </a>
        }
      </div>
    </div>
  `,
  styles: [`
    .project-entry {
      background: var(--card-bg, rgba(255, 255, 255, 0.05));
      border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      position: relative;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      }

      &.project-entry--featured {
        border-color: rgba(99, 102, 241, 0.4);
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
      }

      .project-entry__title {
        margin: 0 0 0.5rem 0;
        font-size: 1.5rem;
        color: var(--text-primary);
      }

      .project-entry__category {
        margin: 0 0 0.75rem 0;
        font-size: 1rem;
        color: var(--text-secondary);
        font-weight: 500;
      }

      .project-entry__dates {
        margin: 0 0 0.75rem 0;
        font-size: 0.85rem;
        color: var(--text-muted);
      }

      .project-entry__description {
        margin: 0 0 1.5rem 0;
        color: var(--text-muted);
        line-height: 1.6;
      }

      .project-entry__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
      }

      .project-entry__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }
    }

    .featured-badge {
      position: absolute;
      top: -8px;
      right: 12px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .tag {
      background: var(--tag-bg, rgba(255, 255, 255, 0.1));
      color: var(--tag-text, var(--text-secondary));
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
    }

    .icon {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }

    .button {
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      background: var(--primary-color, #6366f1);
      color: white;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      transition: filter 0.2s, background 0.2s;

      &:hover {
        filter: brightness(1.1);
      }

      &.button--secondary {
        background: var(--secondary-color, rgba(255, 255, 255, 0.1));
        color: var(--text-primary);
      }

      &.button--outline {
        background: transparent;
        border: 1px solid var(--border-color, rgba(255, 255, 255, 0.2));
        color: var(--text-primary);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectEntryComponent {
  readonly project = input.required<Project>();
  readonly featured = input<boolean>(false);
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(ProjectEntryDialogComponent, {
      data: this.project(),
      width: '600px',
      maxWidth: '90vw'
    });
  }
}

@Component({
  selector: 'app-project-entry-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="project-dialog">
      <h2 mat-dialog-title>{{ data.title }}</h2>
      <mat-dialog-content>
        @if (data.category) {
          <p class="category">{{ data.category }}</p>
        }
        @if (data.startDate || data.endDate) {
          <p class="dates">
            @if (data.startDate) { <span>{{ data.startDate }}</span> }
            @if (data.startDate && data.endDate) { <span> → </span> }
            @if (data.endDate) { <span>{{ data.endDate }}</span> }
          </p>
        }
        @if (data.longDescription) {
          <div class="long-description">
            {{ data.longDescription }}
          </div>
        }

        @if (data.features?.length) {
          <h3>Key Features</h3>
          <ul class="features">
            @for (feature of data.features; track feature) {
              <li>{{ feature }}</li>
            }
          </ul>
        }

        <h3>Tech Stack</h3>
        <div class="tags">
          @for (tech of data.techStack; track tech) {
            <span class="tag">{{ tech }}</span>
          }
        </div>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        @if (data.links?.playstore) {
          <a [href]="data.links!.playstore" target="_blank" rel="noopener" class="button button--primary">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.627a1 1 0 010 1.73l-2.807 1.627L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
            Play Store
          </a>
        }
        @if (data.links?.appstore) {
          <a [href]="data.links!.appstore" target="_blank" rel="noopener" class="button button--primary">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            App Store
          </a>
        }
        @if (data.links?.demo) {
          <a [href]="data.links!.demo" target="_blank" rel="noopener" class="button button--secondary">
            Live Demo
          </a>
        }
        @if (data.links?.github) {
          <a [href]="data.links!.github" target="_blank" rel="noopener" class="button button--outline">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            Source
          </a>
        }
        @if (data.links?.website) {
          <a [href]="data.links!.website" target="_blank" rel="noopener" class="button button--secondary">Website</a>
        }
        <button class="button button--ghost" (click)="close()">Close</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .project-dialog {
      padding: 1rem;
      color: var(--text-primary);
      background: var(--dialog-bg, #1e1e1e);
    }
    .category {
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
    }
    .dates {
      color: var(--text-muted);
      font-size: 0.85rem;
      margin-bottom: 1rem;
    }
    .long-description {
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .features {
      margin-bottom: 1.5rem;
      padding-left: 1.2rem;
      li { margin-bottom: 0.5rem; }
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    .tag {
      background: rgba(255, 255, 255, 0.1);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
    }
    .icon {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
    .button {
      margin-left: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      font-size: 0.85rem;
      font-weight: 600;

      &.button--primary { background: var(--primary-color); color: white; }
      &.button--secondary { background: rgba(255, 255, 255, 0.1); color: var(--text-primary); }
      &.button--outline { background: transparent; border: 1px solid rgba(255, 255, 255, 0.2); color: var(--text-primary); }
      &.button--ghost { background: transparent; color: var(--text-secondary); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectEntryDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private readonly dialogRef: MatDialogRef<ProjectEntryDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
