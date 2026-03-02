import { signal, computed, Signal } from '@angular/core';
import { LoadingState, Result } from '../models/common.types';
import { groupBy, sortBy } from '../utils/common.utils';

/**
 * Base service with common state management patterns
 * Provides loading, error, and data state handling
 */
export abstract class BaseService<T = unknown> {
  /** Loading state */
  protected readonly loading = signal(false);
  
  /** Error state */
  protected readonly error = signal<string | null>(null);
  
  /** Data state */
  protected readonly _data = signal<T | null>(null);
  
  /** Public loading signal */
  readonly isLoading: Signal<boolean> = this.loading.asReadonly();
  
  /** Public error signal */
  readonly hasError: Signal<boolean> = computed(() => this.error() !== null);
  
  /** Public error message signal */
  readonly errorMessage: Signal<string | null> = this.error.asReadonly();
  
  /** Public data signal */
  readonly data: Signal<T | null> = this._data.asReadonly();
  
  /**
   * Set loading state
   */
  protected setLoading(loading: boolean): void {
    this.loading.set(loading);
  }
  
  /**
   * Set error state
   */
  protected setError(error: string | null): void {
    this.error.set(error);
  }
  
  /**
   * Set data state
   */
  protected setData(data: T | null): void {
    this._data.set(data);
  }
  
  /**
   * Clear error state
   */
  clearError(): void {
    this.error.set(null);
  }
  
  /**
   * Reset all state to initial values
   */
  reset(): void {
    this.loading.set(false);
    this.error.set(null);
    this._data.set(null);
  }
}

/**
 * Base service for JSON file loading
 * Extends BaseService with JSON loading functionality
 */
export abstract class BaseJsonService<T = unknown> extends BaseService<T> {
  /**
   * Load data from JSON file
   * @param url - URL to JSON file
   * @param errorMessage - Custom error message
   */
  protected async loadFromJson(
    url: string,
    errorMessage = 'Failed to load data'
  ): Promise<Result<T>> {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json() as T;
      this.setData(data);
      this.setLoading(false);
      
      return { success: true, data };
    } catch (error) {
      const message = error instanceof Error ? error.message : errorMessage;
      this.setError(message);
      this.setLoading(false);
      
      return { 
        success: false, 
        error: error instanceof Error ? error : new Error(message)
      };
    }
  }
}

/**
 * Base service for list data with common operations
 */
export abstract class BaseListService<T extends { id?: string | number }> extends BaseJsonService<T[]> {
  /**
   * Get item by ID
   */
  getById(id: string | number): T | undefined {
    return this.data()?.find(item => item.id === id);
  }
  
  /**
   * Get all items
   */
  getAll(): T[] {
    return this.data() ?? [];
  }
  
  /**
   * Get count of items
   */
  getCount(): number {
    return this.data()?.length ?? 0;
  }
  
  /**
   * Check if data is empty
   */
  isEmpty(): boolean {
    return !this.data() || this.data()!.length === 0;
  }
}

/**
 * Create a computed signal that groups data by a key
 * @param dataSignal - Signal containing array data
 * @param keyFn - Function to extract grouping key
 */
export function createGroupedSignal<T, K extends string | number>(
  dataSignal: Signal<T[] | null>,
  keyFn: (item: T) => K
): Signal<Map<K, T[]>> {
  return computed(() => {
    const data = dataSignal();
    if (!data) return new Map<K, T[]>();
    return groupBy(data, keyFn);
  });
}

/**
 * Create a computed signal that sorts data
 * @param dataSignal - Signal containing array data
 * @param comparers - Array of comparison functions
 */
export function createSortedSignal<T>(
  dataSignal: Signal<T[] | null>,
  comparers: Array<(a: T, b: T) => number>
): Signal<T[]> {
  return computed(() => {
    const data = dataSignal();
    if (!data) return [];
    return sortBy(data, comparers);
  });
}
