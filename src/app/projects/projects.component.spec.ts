import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    if (!TestBed.platform) {
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting(),
      );
    }
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have projects signal', () => {
    expect(component.projects).toBeDefined();
  });

  it('should have isLoading signal', () => {
    expect(component.isLoading).toBeDefined();
  });

  it('should have hasError signal', () => {
    expect(component.hasError).toBeDefined();
  });

  it('should have errorMessage signal', () => {
    expect(component.errorMessage).toBeDefined();
  });

  it('should have featuredProjects signal', () => {
    expect(component.featuredProjects).toBeDefined();
  });
});
