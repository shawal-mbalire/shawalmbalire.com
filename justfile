# Portfolio Justfile
# Common commands for development and Firebase deployment

# Default target
default:
    @just --list

# Development server
serve:
    @echo "Starting development server..."
    bun run start

# Build for production
build:
    @echo "Building for production..."
    bun run build:prod

# Build for development
build-dev:
    @echo "Building for development..."
    bun run build

# Run tests
test:
    @echo "Running tests..."
    bun run test

# Run tests in watch mode
test-watch:
    @echo "Running tests in watch mode..."
    bun run test:watch

# Preview production build locally
preview:
    @echo "Previewing production build..."
    bun run preview

# Firebase: Login to Firebase
firebase-login:
    @echo "Logging in to Firebase..."
    firebase login

# Firebase: Initialize project (if needed)
firebase-init:
    @echo "Initializing Firebase project..."
    firebase init hosting

# Firebase: Deploy to production (live channel)
deploy: build
    @echo "Deploying to Firebase Hosting (production)..."
    firebase deploy --only hosting

# Firebase: Deploy to production with force
deploy-force: build
    @echo "Force deploying to Firebase Hosting..."
    firebase deploy --only hosting --force

# Firebase: Deploy preview channel (for PRs)
deploy-preview: build
    @echo "Deploying to Firebase Hosting (preview channel)..."
    firebase hosting:channel:deploy preview

# Firebase: Delete preview channel
delete-preview:
    @echo "Deleting preview channel..."
    firebase hosting:channel:delete preview

# Firebase: List all channels
channels:
    @echo "Listing Firebase Hosting channels..."
    firebase hosting:channel:list

# Firebase: Open Firebase Console
firebase-console:
    @echo "Opening Firebase Console..."
    @if command -v xdg-open > /dev/null; then \
        xdg-open https://console.firebase.google.com/project/shawalmbalirecom; \
    elif command -v open > /dev/null; then \
        open https://console.firebase.google.com/project/shawalmbalirecom; \
    else \
        echo "Open: https://console.firebase.google.com/project/shawalmbalirecom"; \
    fi

# Build CV (output: ShawalMbalireCV/ShawalMbalireCV.pdf)
cv:
    @echo "Building CV..."
    cd ShawalMbalireCV && just build
    @echo "CV built: ShawalMbalireCV/ShawalMbalireCV.pdf"

# Open CV document
cv-open:
    @echo "Opening CV..."
    @if command -v xdg-open > /dev/null; then \
        xdg-open ShawalMbalireCV/ShawalMbalireCV.pdf; \
    elif command -v open > /dev/null; then \
        open ShawalMbalireCV/ShawalMbalireCV.pdf; \
    else \
        echo "Please open: ShawalMbalireCV/ShawalMbalireCV.pdf"; \
    fi

# Clean build artifacts
clean:
    @echo "Cleaning build artifacts..."
    rm -rf dist/
    rm -rf .angular/

# Install dependencies
install:
    @echo "Installing dependencies..."
    bun install

# Update dependencies
update:
    @echo "Updating dependencies..."
    bun update

# Lint code (if linting is configured)
lint:
    @echo "Linting code..."
    @if [ -f package.json ] && grep -q '"lint"' package.json; then \
        bun run lint; \
    else \
        echo "No lint script configured"; \
    fi

# Format code with Prettier (if configured)
format:
    @echo "Formatting code..."
    @if command -v prettier > /dev/null; then \
        bunx prettier --write "src/**/*.{ts,html,css,scss}"; \
    else \
        echo "Prettier not installed"; \
    fi

# Generate Angular component
generate-component name:
    @echo "Generating component: {{name}}"
    bunx ng generate component {{name}}

# Generate Angular service
generate-service name:
    @echo "Generating service: {{name}}"
    bunx ng generate service {{name}}

# Full deployment workflow
full-deploy: test build deploy
    @echo "Full deployment complete!"

# Show help
help:
    @echo "Portfolio Commands:"
    @echo ""
    @echo "Development:"
    @echo "  just serve        - Start development server"
    @echo "  just build        - Build for production"
    @echo "  just build-dev    - Build for development"
    @echo "  just test         - Run tests"
    @echo "  just test-watch   - Run tests in watch mode"
    @echo "  just preview      - Preview production build locally"
    @echo ""
    @echo "Firebase Deployment:"
    @echo "  just firebase-login    - Login to Firebase"
    @echo "  just deploy            - Deploy to Firebase Hosting (production)"
    @echo "  just deploy-force      - Force deploy to Firebase"
    @echo "  just deploy-preview    - Deploy to preview channel"
    @echo "  just delete-preview    - Delete preview channel"
    @echo "  just channels          - List all hosting channels"
    @echo "  just firebase-console  - Open Firebase Console"
    @echo "  just full-deploy       - Test, build, and deploy"
    @echo ""
    @echo "CV:"
    @echo "  just cv           - Build CV and copy to public/documents"
    @echo "  just cv-open      - Open the generated CV PDF"
    @echo ""
    @echo "Utilities:"
    @echo "  just clean        - Clean build artifacts"
    @echo "  just install      - Install dependencies"
    @echo "  just update       - Update dependencies"
    @echo "  just lint         - Lint code"
    @echo "  just format       - Format code"
    @echo "  just help         - Show this help"
