import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

/**
 * Application routes configuration
 * Note: Currently using single-page layout with anchor navigation
 * Future: Implement lazy-loaded routes for separate pages
 */
export const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'home',
    component: AppComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
