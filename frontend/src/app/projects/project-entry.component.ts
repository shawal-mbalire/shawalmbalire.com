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
    <div class="project-card" [class.project-card--featured]="featured()">
      <div class="project-card__content">
        <div class="project-card__header">
          <h2 class="project-card__title">
            {{ project().title }}
            @if (featured()) {
              <span class="featured-badge">Featured</span>
            }
          </h2>
          <div class="project-card__meta-info">
            @if (project().category) {
              <span class="project-card__category">{{ project().category }}</span>
            }
            @if (project().status) {
              <span class="project-card__status">{{ project().status }}</span>
            }
            @if (project().startDate || project().endDate) {
              <span class="project-card__dates">
                {{ project().startDate }}{{ project().startDate && project().endDate ? ' → ' : '' }}{{ project().endDate }}
              </span>
            }
          </div>
        </div>

        <p class="project-card__description">{{ project().description }}</p>

        <div class="project-card__tags">
          @for (tech of project().techStack; track tech) {
            <span class="tag">{{ tech }}</span>
          }
        </div>

        <div class="project-card__actions">
          <button class="button button--primary" (click)="openDialog()" [attr.aria-label]="'Show more about ' + project().title">
            <svg class="button__icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            Details
          </button>

          @if (project().links?.github) {
            <a [href]="project().links?.github" target="_blank" rel="noopener" class="button button--secondary" aria-label="View source code on GitHub">
              <svg class="button__icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Source
            </a>
          }
          @if (project().links?.website) {
            <a [href]="project().links?.website" target="_blank" rel="noopener" class="button button--secondary">
              <svg class="button__icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
              </svg>
              Website
            </a>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .project-card {
      display: flex;
      width: 100%;
    }

    .project-card__content {
      flex: 1;
      padding: 1.5rem;
      background: var(--primaryColor);
      border: 2px solid var(--secondaryColor);
      border-radius: 12px;
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
      position: relative;
    }

    .project-card:hover .project-card__content {
      transform: translateX(4px);
      box-shadow: 0 8px 24px var(--glowColor);
      border-color: var(--secondaryColor);
    }

    .project-card--featured .project-card__content {
      border-color: var(--secondaryColor);
      border-width: 3px;
      background: var(--primaryColor);
    }

    .project-card__header {
      margin-bottom: 1rem;
    }

    .project-card__title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--fontColor);
      margin: 0;
      line-height: 1.3;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .featured-badge {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: var(--secondaryColor);
      color: var(--backgroundColor);
      padding: 0.15rem 0.6rem;
      border-radius: 9999px;
    }

    .project-card__meta-info {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 0.5rem;
    }

    .project-card__category {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--secondaryColor);
      background: var(--backgroundColor);
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      border: 1px solid var(--secondaryColor);
    }

    .project-card__status {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--backgroundColor);
      background: var(--dim-gray);
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      text-transform: uppercase;
    }

    .project-card__dates {
      font-size: 0.8rem;
      color: var(--dim-gray);
      font-weight: 500;
    }

    .project-card__description {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--fontColor);
      margin: 0 0 1.25rem 0;
    }

    .project-card__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .tag {
      display: inline-block;
      padding: 0.3rem 0.7rem;
      background: var(--backgroundColor);
      border: 1px solid var(--secondaryColor);
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--fontColor);
      transition: background 0.2s ease, transform 0.2s ease;
    }

    .tag:hover {
      background: var(--secondaryColor);
      color: var(--backgroundColor);
      transform: translateY(-1px);
    }

    .project-card__actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.6rem 1.2rem;
      font-weight: 700;
      border-radius: 10px;
      border: 2px solid var(--secondaryColor);
      color: var(--secondaryColor);
      background: transparent;
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
      text-decoration: none;
      white-space: nowrap;
      font-size: 0.9rem;
      cursor: pointer;
    }

    .button--primary {
      background: var(--secondaryColor);
      color: var(--backgroundColor);
    }

    .button:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px var(--glowColor);
    }

    .button--primary:hover {
      filter: brightness(1.1);
    }

    .button--secondary:hover {
      background: var(--secondaryColor);
      color: var(--backgroundColor);
    }

    .button__icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }

    @media (max-width: 640px) {
      .project-card__actions {
        flex-direction: column;
      }
      .button {
        width: 100%;
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
      <h2 mat-dialog-title class="dialog-title">{{ data.title }}</h2>
      <mat-dialog-content class="dialog-content">
        <div class="dialog-meta">
          @if (data.category) {
            <span class="category-badge">{{ data.category }}</span>
          }
          @if (data.status) {
            <span class="status-badge">{{ data.status }}</span>
          }
        </div>
        @if (data.startDate || data.endDate) {
          <p class="dates">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
            </svg>
            {{ data.startDate }}{{ data.startDate && data.endDate ? ' → ' : '' }}{{ data.endDate }}
          </p>
        }
        @if (data.longDescription) {
          <div class="long-description">
            {{ data.longDescription }}
          </div>
        }

        @if (data.features?.length) {
          <h3 class="section-header">Key Features</h3>
          <ul class="features-list">
            @for (feature of data.features; track feature) {
              <li>
                <svg class="check-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                {{ feature }}
              </li>
            }
          </ul>
        }

        <h3 class="section-header">Tech Stack</h3>
        <div class="tags-container">
          @for (tech of data.techStack; track tech) {
            <span class="tag">{{ tech }}</span>
          }
        </div>
      </mat-dialog-content>
      <mat-dialog-actions align="end" class="dialog-actions">
        @if (data.links?.playstore) {
          <a [href]="data.links!.playstore" target="_blank" rel="noopener" class="button button--primary">
            Play Store
          </a>
        }
        @if (data.links?.appstore) {
          <a [href]="data.links!.appstore" target="_blank" rel="noopener" class="button button--primary">
            App Store
          </a>
        }
        @if (data.links?.github) {
          <a [href]="data.links!.github" target="_blank" rel="noopener" class="button button--secondary">
            GitHub
          </a>
        }
        <button class="button button--outline" (click)="close()">Close</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .project-dialog {
      background: var(--primaryColor);
      color: var(--fontColor);
      border-radius: 12px;
      overflow: hidden;
    }

    .dialog-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--fontColor);
      padding: 1.5rem 1.5rem 0.5rem;
      margin: 0;
    }

    .dialog-content {
      padding: 0 1.5rem 1.5rem !important;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .dialog-meta {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .category-badge {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--secondaryColor);
      background: var(--backgroundColor);
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      border: 1px solid var(--secondaryColor);
    }

    .status-badge {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--backgroundColor);
      background: var(--dim-gray);
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      text-transform: uppercase;
    }

    .dates {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: var(--dim-gray);
      margin: 0;
    }

    .icon {
      width: 18px;
      height: 18px;
    }

    .long-description {
      font-size: 1rem;
      line-height: 1.6;
      margin: 0.5rem 0;
    }

    .section-header {
      font-size: 1.1rem;
      font-weight: 700;
      margin: 1rem 0 0.5rem;
      color: var(--secondaryColor);
    }

    .features-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .features-list li {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .check-icon {
      width: 18px;
      height: 18px;
      color: var(--myrtle-green);
      flex-shrink: 0;
      margin-top: 0.1rem;
    }

    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tag {
      display: inline-block;
      padding: 0.3rem 0.7rem;
      background: var(--backgroundColor);
      border: 1px solid var(--secondaryColor);
      border-radius: 9999px;
      font-size: 0.8rem;
      color: var(--fontColor);
    }

    .dialog-actions {
      padding: 1rem 1.5rem !important;
      background: var(--backgroundColor);
      gap: 0.75rem;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.6rem 1.2rem;
      font-weight: 700;
      border-radius: 8px;
      border: 2px solid var(--secondaryColor);
      color: var(--secondaryColor);
      background: transparent;
      transition: all 0.2s ease;
      text-decoration: none;
      font-size: 0.9rem;
      cursor: pointer;
    }

    .button--primary {
      background: var(--secondaryColor);
      color: var(--backgroundColor);
    }

    .button--outline {
      border-color: var(--secondaryColor);
      color: var(--secondaryColor);
    }

    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px var(--glowColor);
    }

    .button--primary:hover {
      filter: brightness(1.1);
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
