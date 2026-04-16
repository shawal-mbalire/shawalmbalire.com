import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';

import { ProjectEntryComponent, ProjectEntryDialogComponent } from './project-entry.component';
import { Project } from '../core/models/project.model';

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project description',
  category: 'Web Application',
  techStack: ['Angular', 'TypeScript', 'Node.js'],
  longDescription: 'A longer description of the test project for the dialog view.',
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  links: {
    github: 'https://github.com/test/project',
    website: 'https://test-project.example.com',
    demo: 'https://demo.test-project.example.com'
  },
  startDate: '2024-01',
  endDate: '2024-06',
  isFeatured: true,
  order: 1
};

describe('ProjectEntryComponent', () => {
  let component: ProjectEntryComponent;
  let fixture: ComponentFixture<ProjectEntryComponent>;

  beforeEach(async () => {
    if (!TestBed.platform) {
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting(),
      );
    }
    await TestBed.configureTestingModule({
      imports: [ProjectEntryComponent, MatDialogModule],
      providers: [provideAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectEntryComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', mockProject);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display project title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.project-entry__title')?.textContent).toContain('Test Project');
  });

  it('should display project category', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.project-entry__category')?.textContent).toContain('Web Application');
  });

  it('should display project description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.project-entry__description')?.textContent).toContain('A test project description');
  });

  it('should display tech stack tags', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tags = compiled.querySelectorAll('.tag');
    expect(tags.length).toBe(3);
    expect(tags[0].textContent).toContain('Angular');
    expect(tags[1].textContent).toContain('TypeScript');
    expect(tags[2].textContent).toContain('Node.js');
  });

  it('should show featured badge when featured is true', () => {
    fixture.componentRef.setInput('featured', true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.featured-badge')).toBeTruthy();
  });

  it('should not show featured badge when featured is false', () => {
    fixture.componentRef.setInput('featured', false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.featured-badge')).toBeFalsy();
  });

  it('should show website link when available', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('a');
    const websiteLink = Array.from(links).find(a => a.textContent?.includes('Website'));
    expect(websiteLink).toBeTruthy();
  });

  it('should show Show More button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent).toContain('Show More');
  });
});

describe('ProjectEntryDialogComponent', () => {
  let component: ProjectEntryDialogComponent;
  let fixture: ComponentFixture<ProjectEntryDialogComponent>;

  beforeEach(async () => {
    if (!TestBed.platform) {
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting(),
      );
    }
    await TestBed.configureTestingModule({
      imports: [ProjectEntryDialogComponent, MatDialogModule],
      providers: [
        provideAnimations(),
        { provide: MAT_DIALOG_DATA, useValue: mockProject },
        { provide: MatDialogRef, useValue: { close: () => {} } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display project title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[mat-dialog-title]')?.textContent).toContain('Test Project');
  });

  it('should display long description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.long-description')?.textContent).toContain('A longer description');
  });

  it('should display features list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const features = compiled.querySelectorAll('.features li');
    expect(features.length).toBe(3);
  });

  it('should display tech stack tags', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tags = compiled.querySelectorAll('.tags .tag');
    expect(tags.length).toBe(3);
  });

  it('should have close button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    const closeButton = Array.from(buttons).find(b => b.textContent?.includes('Close'));
    expect(closeButton).toBeTruthy();
  });
});
