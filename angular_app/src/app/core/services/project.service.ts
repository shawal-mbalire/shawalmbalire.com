import { Injectable, computed } from '@angular/core';
import { BaseListService } from './base.service';
import { Project } from '../models/project.model';

/**
 * Service to manage project entries
 * Loads data from projects.json and provides computed views
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseListService<Project> {
  private readonly projectsJsonPath = 'projects.json';

  /** Projects sorted by order field */
  readonly featuredProjects = computed(() =>
    this.data()?.filter(p => p.isFeatured) ?? []
  );

  constructor() {
    super();
    void this.loadProjects();
  }

  /**
   * Load projects from JSON file
   */
  private async loadProjects(): Promise<void> {
    const result = await this.loadFromJson(
      this.projectsJsonPath,
      'Failed to load projects'
    );

    if (result.success && result.data) {
      // Sort projects by order field
      this._data.set(result.data.sort((a, b) => (a.order || 0) - (b.order || 0)));
    }
  }
}
