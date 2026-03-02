import { Injectable } from '@angular/core';
import { BaseListService } from './base.service';
import { WorkEntry } from '../models/work-entry.model';

/**
 * Service to fetch and manage work entries
 * Loads data from work-entries.json and provides computed views
 */
@Injectable({
  providedIn: 'root'
})
export class WorkEntryService extends BaseListService<WorkEntry> {
  private readonly jsonUrl = 'work-entries.json';

  constructor() {
    super();
    void this.loadWorkEntries();
  }

  /**
   * Load work entries from JSON file
   */
  private async loadWorkEntries(): Promise<void> {
    await this.loadFromJson(
      this.jsonUrl,
      'Failed to load work entries'
    );
  }

  /**
   * Get entries by work mode
   */
  getByWorkMode(workMode: string): WorkEntry[] {
    return this.getAll().filter(entry => entry.workMode === workMode);
  }

  /**
   * Get entries by type
   */
  getByType(type: string): WorkEntry[] {
    return this.getAll().filter(entry => entry.type === type);
  }

  /**
   * Get unique work modes
   */
  getWorkModes(): string[] {
    const modes = new Set(this.getAll().map(entry => entry.workMode).filter(Boolean));
    return Array.from(modes) as string[];
  }
}
