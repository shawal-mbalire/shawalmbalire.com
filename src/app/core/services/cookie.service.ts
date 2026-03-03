import { Injectable } from '@angular/core';

/**
 * Theme persistence service using localStorage
 * More reliable than cookies, especially on iOS Safari
 * Data persists across sessions and browser restarts
 */
@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private readonly STORAGE_KEY = 'theme_preference';

  /**
   * Set theme preference in localStorage
   * @param theme Theme name to store
   */
  set(theme: string): void {
    if (typeof localStorage === 'undefined') {
      console.warn('localStorage not available');
      return;
    }
    
    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
    } catch (e) {
      console.error('Failed to save theme preference:', e);
    }
  }

  /**
   * Get theme preference from localStorage
   * @returns Theme name or null if not set
   */
  get(): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    
    try {
      return localStorage.getItem(this.STORAGE_KEY);
    } catch (e) {
      console.error('Failed to read theme preference:', e);
      return null;
    }
  }

  /**
   * Delete theme preference from localStorage
   */
  delete(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (e) {
      console.error('Failed to delete theme preference:', e);
    }
  }

  /**
   * Check if theme preference exists
   * @returns True if theme is stored
   */
  exists(): boolean {
    return this.get() !== null;
  }
}
