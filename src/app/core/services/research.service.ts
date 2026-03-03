import { Injectable, computed } from '@angular/core';
import { BaseListService, createGroupedSignal } from './base.service';
import { ResearchEntry } from '../models/research.model';

/**
 * Service to manage research entries
 * Loads data from research-entries.json and provides computed views
 */
@Injectable({
  providedIn: 'root'
})
export class ResearchService extends BaseListService<ResearchEntry> {
  private readonly researchJsonPath = 'research-entries.json';

  /** Research entries grouped by year (descending) */
  readonly researchByYear = createGroupedSignal(
    this.data,
    (entry: ResearchEntry) => entry.year
  );

  constructor() {
    super();
    void this.loadResearch();
  }

  /**
   * Load research entries from JSON file
   */
  private async loadResearch(): Promise<void> {
    await this.loadFromJson(
      this.researchJsonPath,
      'Failed to load research entries'
    );
  }

  /**
   * Get research entries for a specific year
   */
  getByYear(year: number): ResearchEntry[] {
    return this.researchByYear().get(year) ?? [];
  }

  /**
   * Get all years with research entries (descending order)
   */
  getYears(): number[] {
    return Array.from(this.researchByYear().keys()).sort((a, b) => b - a);
  }

  /**
   * Get research count by year
   */
  getCountByYear(): Map<number, number> {
    const grouped = this.researchByYear();
    const counts = new Map<number, number>();
    
    grouped.forEach((entries, year) => {
      counts.set(year, entries.length);
    });
    
    return counts;
  }
}
