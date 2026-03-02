import { signal, computed, Signal } from '@angular/core';

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
