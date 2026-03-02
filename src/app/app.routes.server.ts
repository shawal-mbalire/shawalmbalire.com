import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Server-side routes configuration
 * 
 * RenderMode options:
 * - Prerender: Pre-renders the route at build time (static)
 * - Server: Renders on each request (dynamic)
 * - Client: Client-side rendering only
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
