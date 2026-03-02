# Portfolio Application

Modern Angular v21 portfolio website optimized for Firebase Hosting.

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run start

# Build for production
bun run build:prod

# Deploy to Firebase
bun run deploy
```

## Project Structure

```
.
├── .github/workflows/       # GitHub Actions CI/CD
│   ├── firebase-hosting-merge.yml
│   └── firebase-hosting-pull-request.yml
├── .firebaseignore          # Firebase Hosting ignore patterns
├── firebase.json            # Firebase Hosting configuration
├── firestore.rules          # Firestore security rules
├── database.rules.json      # Realtime Database rules
├── .firebaserc              # Firebase project mapping
│
├── src/app/
│   ├── core/                # Core module (singleton services, models, constants)
│   │   ├── models/          # TypeScript interfaces and types
│   │   ├── services/        # Application-wide services
│   │   ├── constants/       # Application constants
│   │   ├── aria/            # Accessibility directives
│   │   └── index.ts         # Barrel export
│   │
│   ├── home/                # Home feature
│   ├── about/               # About feature
│   ├── experience/          # Experience feature
│   ├── contact/             # Contact feature
│   ├── nav/                 # Navigation feature
│   ├── footer/              # Footer feature
│   ├── theme-switcher/      # Theme switcher feature
│   └── work-entry/          # Work entry component
│
├── scripts/
│   └── generate-config.ts   # Runtime config generator
│
├── public/                  # Static assets (copied to build output)
├── dist/                    # Build output (deployed to Firebase)
└── package.json
```

## Firebase Hosting Configuration

### Caching Strategy

| File Type | Cache-Control |
|-----------|---------------|
| JS/CSS | `max-age=31536000, immutable` |
| Fonts | `max-age=31536000, immutable` |
| Images | `max-age=31536000, immutable` |
| HTML | `no-cache, no-store, must-revalidate` |

### Security Headers

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`

## Development

### Using Just (Recommended)

```bash
just serve           # Start dev server
just build           # Build for production
just test            # Run tests
just deploy          # Deploy to Firebase (production)
just deploy-preview  # Deploy to preview channel
just firebase-console # Open Firebase Console
```

### Using npm scripts

```bash
bun run start        # Start dev server
bun run build:prod   # Build for production
bun run deploy       # Build and deploy to Firebase
```

## Deployment

### Manual Deploy

```bash
# Login to Firebase (first time only)
firebase login

# Deploy to production
just deploy
# or
bun run deploy
```

### CI/CD with GitHub Actions

The repository includes GitHub Actions workflows for automated deployment:

1. **On PR**: Deploys to a preview channel
2. **On merge to main**: Deploys to production (live channel)

Required secrets:
- `FIREBASE_SERVICE_ACCOUNT_SHAWALMBALIRECOM` - Firebase service account JSON

## Available Themes

- Light (Default)
- Dark (Default)
- Catppuccin
- Tokyo Night
- Solarized Light
- Solarized Dark

## CV Build

The CV is built from LaTeX source in the `ShawalMbalireCV/` directory:

```bash
# Build CV and copy to public/documents
just cv

# Open the generated CV
just cv-open
```

The generated PDF is placed at `public/documents/MbalireShawalCV.pdf` and included in the build output.

## Testing

```bash
# Run tests once
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage
bun run test:coverage
```

## Tech Stack

- **Angular v21** - Frontend framework with standalone components
- **TypeScript** - Type-safe JavaScript
- **Angular Material** - UI components
- **Vitest** - Testing framework
- **Firebase Hosting** - CDN-backed hosting with SSL
- **Bun** - Fast package manager and runtime
- **GitHub Actions** - CI/CD automation

## Firebase Commands Reference

```bash
# Authentication
firebase login
firebase logout

# Project management
firebase projects:list
firebase use <project-id>

# Hosting
firebase deploy --only hosting
firebase hosting:channel:deploy <channel-name>
firebase hosting:channel:list
firebase hosting:channel:delete <channel-name>

# Full deploy (hosting + other services)
firebase deploy
```

## Build Output

The build produces optimized bundles:

```
dist/portfolio/browser/
├── index.html         # Main entry point
├── *.js              # JavaScript bundles (hashed)
├── *.css             # Stylesheet bundles (hashed)
└── public/           # Static assets
```

## Environment Variables

Runtime configuration is generated at build time:

```json
{
  "appName": "Portfolio",
  "environment": "production",
  "baseUrl": "/",
  "contactEmail": "mbalireshawal@gmail.com"
}
```

Generated at: `public/app-config.json`
