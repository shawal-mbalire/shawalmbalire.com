# Monorepo Justfile
# Shawal Mbalire Portfolio — Angular App + LaTeX CV

default:
    @just --list

# ─── Frontend (Angular) ────────────────────────────────────────

angular_serve:
    @echo "Starting Angular dev server..."
    cd frontend && bun run start

angular_build:
    @echo "Building Angular app (production)..."
    cd frontend && bun run build:prod

angular_build_dev:
    @echo "Building Angular app (development)..."
    cd frontend && bun run build

angular_test:
    @echo "Running Angular tests..."
    cd frontend && bun run test

angular_test_watch:
    @echo "Running Angular tests (watch mode)..."
    cd frontend && bun run test:watch

angular_preview:
    @echo "Previewing Angular production build..."
    cd frontend && bun run preview

angular_install:
    @echo "Installing Angular dependencies..."
    cd frontend && bun install

angular_clean:
    @echo "Cleaning Angular build artifacts..."
    cd frontend && rm -rf dist/ .angular/

# ─── LaTeX CV ──────────────────────────────────────────────────

cv_build:
    @echo "Building CV (ShawalMbalireCV.pdf)..."
    cd latex && xelatex -interaction=nonstopmode -halt-on-error -file-line-error -jobname=ShawalMbalireCV -output-directory=. main.tex
    cd latex && xelatex -interaction=nonstopmode -halt-on-error -file-line-error -jobname=ShawalMbalireCV -output-directory=. main.tex

cv_clean:
    @echo "Cleaning LaTeX aux files..."
    cd latex && rm -f *.aux *.log *.out *.toc *.blg *.bbl *.fls *.fdb_latexmk *.synctex.gz

cv_view:
    @echo "Opening CV..."
    @if [ -f latex/ShawalMbalireCV.pdf ]; then xdg-open latex/ShawalMbalireCV.pdf; else echo "ShawalMbalireCV.pdf not found. Run 'just cv_build' first."; fi

# ─── Firebase Deployment ───────────────────────────────────────

firebase_deploy: angular_build
    @echo "Deploying to Firebase Hosting (production)..."
    cd frontend && firebase deploy --only hosting

firebase_deploy_force: angular_build
    @echo "Force deploying to Firebase Hosting..."
    cd frontend && firebase deploy --only hosting --force

firebase_deploy_preview: angular_build
    @echo "Deploying to Firebase Hosting (preview channel)..."
    cd frontend && firebase hosting:channel:deploy preview

firebase_login:
    cd frontend && firebase login

firebase_console:
    @if command -v xdg-open > /dev/null; then \
        xdg-open https://console.firebase.google.com/project/shawalmbalirecom; \
    elif command -v open > /dev/null; then \
        open https://console.firebase.google.com/project/shawalmbalirecom; \
    else \
        echo "Open: https://console.firebase.google.com/project/shawalmbalirecom"; \
    fi

# ─── Full Workflow ─────────────────────────────────────────────

build_all: angular_build cv_build
    @echo "All builds complete!"

test_all: angular_test
    @echo "All tests passed!"

clean_all: angular_clean cv_clean
    @echo "All build artifacts cleaned."

full_deploy: test_all angular_build firebase_deploy
    @echo "Full deployment complete!"

# ─── Utilities ─────────────────────────────────────────────────

lint:
    @echo "Linting Angular code..."
    cd frontend && if grep -q '"lint"' package.json; then bun run lint; else echo "No lint script configured"; fi

format:
    @echo "Formatting Angular code..."
    cd frontend && if command -v prettier > /dev/null; then bunx prettier --write "src/**/*.{ts,html,css,scss}"; else echo "Prettier not installed"; fi

# ─── Aliases (shortcuts) ───────────────────────────────────────

serve:
    @just angular_serve

build:
    @just angular_build

test:
    @just angular_test

cv:
    @just cv_build

cv-open:
    @just cv_view

deploy:
    @just firebase_deploy

clean:
    @just clean_all
