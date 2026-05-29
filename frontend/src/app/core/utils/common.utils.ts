import { GroupedData } from '../models/common.types';

/**
 * Group an array by a key function
 * @param array - Array to group
 * @param keyFn - Function to extract the grouping key
 * @returns Map of grouped items
 */
export function groupBy<T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K
): GroupedData<T, K> {
  const grouped = new Map<K, T[]>();
  
  array.forEach(item => {
    const key = keyFn(item);
    const existing = grouped.get(key) || [];
    existing.push(item);
    grouped.set(key, existing);
  });
  
  return grouped;
}

/**
 * Sort array by multiple criteria
 * @param array - Array to sort
 * @param comparers - Array of comparison functions
 * @returns Sorted array (new instance)
 */
export function sortBy<T>(
  array: T[],
  comparers: Array<(a: T, b: T) => number>
): T[] {
  return [...array].sort((a, b) => {
    for (const comparer of comparers) {
      const result = comparer(a, b);
      if (result !== 0) return result;
    }
    return 0;
  });
}

/**
 * Safe JSON parse with error handling
 * @param json - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed value or fallback
 */
export function safeJsonParse<T>(json: string | null | undefined, fallback: T): T {
  if (!json) return fallback;
  
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Check if value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Check if value is null or undefined
 */
export function isNullOrUndefined<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Get value or default if null/undefined
 */
export function valueOrDefault<T>(value: T | null | undefined, defaultValue: T): T {
  return isDefined(value) ? value : defaultValue;
}

/**
 * Create a debounced function
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Create a throttled function
 * @param fn - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
