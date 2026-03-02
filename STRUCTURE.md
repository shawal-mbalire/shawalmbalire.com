# Portfolio Application

Modern Angular v21 portfolio website with SSR support and multiple themes.

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run start

# Build for production
bun run build:prod

# Run tests
bun run test
```

## Project Structure

```
src/app/
├── core/                    # Core module (singleton services, models, constants)
│   ├── models/              # TypeScript interfaces and types
│   │   ├── index.ts         # Barrel export
│   │   └── work-entry.model.ts
│   ├── services/            # Application-wide services
│   │   ├── index.ts         # Barrel export
│   │   ├── theme.service.ts
│   │   ├── about.service.ts
│   │   ├── experience.service.ts
│   │   └── work-entry.service.ts
│   ├── constants/           # Application constants
│   │   └── app.constants.ts
│   ├── interceptors/        # HTTP interceptors (future)
│   ├── guards/              # Route guards (future)
│   ├── pipes/               # Custom pipes (future)
│   ├── aria/                # Accessibility directives
│   │   └── index.ts
│   └── index.ts             # Barrel export
│
├── home/                    # Home feature module
│   ├── home.component.ts
│   ├── home.component.html
│   ├── home.component.css
│   ├── home.component.spec.ts
│   └── index.ts
│
├── about/                   # About feature module
│   ├── about.component.ts
│   ├── about.component.html
│   ├── about.component.css
│   ├── about.component.spec.ts
│   └── index.ts
│
├── experience/              # Experience feature module
│   ├── experience.component.ts
│   ├── experience.component.html
│   ├── experience.component.css
│   ├── experience.component.spec.ts
│   └── index.ts
│
├── contact/                 # Contact feature module
│   ├── contact.component.ts
│   ├── contact.component.html
│   ├── contact.component.css
│   ├── contact.component.spec.ts
│   └── index.ts
│
├── nav/                     # Navigation feature module
│   ├── nav.component.ts
│   ├── nav.component.html
│   ├── nav.component.css
│   ├── nav.component.spec.ts
│   └── index.ts
│
├── footer/                  # Footer feature module
│   ├── footer.component.ts
│   ├── footer.component.html
│   ├── footer.component.css
│   ├── footer.component.spec.ts
│   └── index.ts
│
├── theme-switcher/          # Theme switcher feature module
│   ├── theme-switcher.component.ts
│   ├── theme-switcher.component.html
│   ├── theme-switcher.component.css
│   ├── theme-switcher.component.spec.ts
│   └── index.ts
│
├── work-entry/              # Work entry shared component
│   ├── work-entry.component.ts
│   ├── work-entry.component.html
│   ├── work-entry.component.css
│   ├── work-entry-dialog.html
│   ├── work-entry-dialog.css
│   ├── work-entry.component.spec.ts
│   └── index.ts
│
├── app.component.ts         # Root component
├── app.config.ts            # Application configuration
├── app.config.server.ts     # Server-side configuration
├── app.routes.ts            # Client-side routes
├── app.routes.server.ts     # Server-side routes
└── index.ts                 # Main barrel export
```

## Architecture Principles

### Standalone Components
All components use Angular's standalone API (no NgModules for components).

### Barrel Exports
Use barrel exports (`index.ts`) for clean imports:
```typescript
// Instead of:
import { ThemeService } from '../../core/services/theme.service';

// Use:
import { ThemeService } from '@app/core/services';
```

### Core Module Pattern
- **models**: Shared TypeScript interfaces
- **services**: Singleton services with `providedIn: 'root'`
- **constants**: Application-wide constants
- **aria**: Accessibility directives

### Feature Modules
Each feature folder contains:
- Component files (ts, html, css, spec.ts)
- Barrel export (index.ts)

## Available Themes

- Light (Default)
- Dark (Default)
- Catppuccin
- Tokyo Night
- Solarized Light
- Solarized Dark

## Development

### Using Just (Recommended)
If you have [just](https://github.com/casey/just) installed:
```bash
just serve      # Start dev server
just build      # Build for production
just test       # Run tests
just deploy     # Deploy to Firebase
just cv         # Open CV document
```

### Using Bun
```bash
bun run start   # Start dev server
bun run build   # Build for development
bun run build:prod  # Build for production
bun run test    # Run tests
```

## Build Notes

The application uses static site generation (SSG) for optimal performance. SSR files are included in the project for future enhancement when Angular SSR route extraction is stable.

## Testing

```bash
# Run tests once
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage
bun run test:coverage
```

## Deployment

```bash
# Build and deploy to Firebase
bun run build:prod
firebase deploy --only hosting
```

## Tech Stack

- **Angular v21** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **Angular Material** - UI components
- **Vitest** - Testing framework
- **Firebase Hosting** - Deployment platform
- **Bun** - Package manager and runtime
