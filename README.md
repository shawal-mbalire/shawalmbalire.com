# Portfolio

Static Angular SPA served as static files. Scripts are Bun-first and follow applicable 12‑Factor practices (explicit deps, env‑driven config, build/release/run separation).

## Prerequisites

- Bun 1.0+

## Install

```bash
bun install
```

## Development

```bash
bun start
# http://localhost:4200
```

## Configuration (12‑Factor: Config)

Non‑secret runtime config is generated at build time from environment variables and written to `public/app-config.json`.

1. Copy `.env.example` to `.env` and edit values.
2. Build (the `prebuild` step generates the config file).

Available variables:

- `PUBLIC_APP_NAME` – Display name
- `PUBLIC_ENV` – `production` | `development`
- `PUBLIC_BASE_URL` – Base URL for deployment
- `PUBLIC_CONTACT_EMAIL` – Contact email
- `PUBLIC_ANALYTICS_ID` – Analytics tag (optional)

## Build (12‑Factor: Build, Release, Run)

```bash
# Development build
bun run build

# Production build
bun run build:prod
```

Artifacts are written to `dist/portfolio/browser`.

## Preview static build

```bash
bun run preview
# http://localhost:4173
```

## Tests

```bash
bun run test        # run once
bun run test:watch  # watch mode
bun run test:coverage
```

## Notes

- No server/Express is required in production; hosting serves the contents of `dist/portfolio/browser`.
- `.env` is ignored by Git; `.env.example` documents expected config.
