import { Injectable } from '@angular/core';

/**
 * Cookie utility service for managing browser cookies
 */
@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private readonly defaultMaxAge = 365 * 24 * 60 * 60; // 1 year in seconds

  /**
   * Set a cookie
   * @param name Cookie name
   * @param value Cookie value
   * @param maxAge Max age in seconds (default: 1 year)
   */
  set(name: string, value: string, maxAge: number = this.defaultMaxAge): void {
    if (typeof document === 'undefined') return;
    
    const expires = `max-age=${maxAge}`;
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; SameSite=Lax`;
  }

  /**
   * Get a cookie value
   * @param name Cookie name
   * @returns Cookie value or null if not found
   */
  get(name: string): string | null {
    if (typeof document === 'undefined') return null;
    
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  }

  /**
   * Delete a cookie
   * @param name Cookie name
   */
  delete(name: string): void {
    if (typeof document === 'undefined') return;
    
    document.cookie = `${name}=; max-age=0; path=/`;
  }

  /**
   * Check if a cookie exists
   * @param name Cookie name
   * @returns True if cookie exists
   */
  exists(name: string): boolean {
    return this.get(name) !== null;
  }
}
