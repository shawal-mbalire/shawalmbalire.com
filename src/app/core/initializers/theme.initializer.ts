import { APP_INITIALIZER, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';

/**
 * Load theme preference from localStorage before app bootstraps
 * This ensures the correct theme is applied immediately without inline scripts
 */
export function provideThemeInitializer() {
  return {
    provide: APP_INITIALIZER,
    useFactory: () => {
      const themeService = inject(ThemeService);
      return () => themeService.initializeTheme();
    },
    multi: true
  };
}
