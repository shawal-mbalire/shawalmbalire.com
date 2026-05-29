# Shawal Mbalire — Portfolio Monorepo

Monorepo containing:
- **`frontend/`** — Angular 21 SPA portfolio site (Firebase Hosting)
- **`latex/`** — LaTeX CV / Resume (Awesome-CV)

## Prerequisites

- [Bun](https://bun.sh) 1.0+
- [Just](https://github.com/casey/just) — task runner
- [XeLaTeX](https://tug.org/xetex/) — for CV builds
- [Firebase CLI](https://firebase.google.com/docs/cli) — for deployment

## Quick Start

```bash
just               # list all available commands
just serve         # start Angular dev server (http://localhost:4200)
just build         # production Angular build
just test          # run Angular tests
just cv_build      # build LaTeX CV to PDF
just cv_view       # open the generated CV PDF
just deploy        # build + deploy to Firebase Hosting
```

## Project Structure

```
.
├── frontend/             # Angular portfolio SPA
│   ├── src/
│   ├── public/
│   ├── firebase.json
│   ├── package.json
│   └── justfile          # Frontend-specific commands
├── latex/                # LaTeX CV & Resume
│   ├── main.tex
│   ├── resume.tex
│   ├── awesome-cv.cls
│   └── justfile          # LaTeX-specific commands
├── .github/workflows/    # CI/CD pipelines
├── justfile              # Monorepo-level commands
└── README.md
```

## CI/CD

| Workflow | Trigger | Job |
|----------|---------|-----|
| `ci.yml` | Push / PR | Angular build + test, LaTeX CV build |
| `firebase-hosting-merge.yml` | Push to `main` | Deploy to Firebase live channel |
| `firebase-hosting-pull-request.yml` | PR to `main` | Deploy Firebase preview channel |

## Angular App

See [`frontend/README.md`](frontend/README.md) for details.

```bash
cd frontend
bun install
just serve       # dev server
just build       # production build
just test        # tests
```

## LaTeX CV

```bash
cd latex
make             # or: xelatex main.tex (run twice)
open ShawalMbalireCV.pdf
```

## Environment Variables

Copy `.env.example` → `.env` in `frontend/`:

| Variable | Description |
|----------|-------------|
| `PUBLIC_APP_NAME` | Display name |
| `PUBLIC_ENV` | `production` \| `development` |
| `PUBLIC_BASE_URL` | Base URL for deployment |
| `PUBLIC_CONTACT_EMAIL` | Contact email |
| `PUBLIC_ANALYTICS_ID` | Analytics tag (optional) |
