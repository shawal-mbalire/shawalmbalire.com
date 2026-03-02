# Portfolio Justfile
# Common commands for development and deployment

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

# Deploy to Firebase
deploy: build
    @echo "Deploying to Firebase..."
    firebase deploy --only hosting

# Deploy to Firebase with force
deploy-force: build
    @echo "Force deploying to Firebase..."
    firebase deploy --only hosting --force

# Open CV document
cv:
    @echo "Opening CV..."
    @if command -v xdg-open > /dev/null; then \
        xdg-open ShawalMbalireCV/main.pdf; \
    elif command -v open > /dev/null; then \
        open ShawalMbalireCV/main.pdf; \
    else \
        echo "Please open: ShawalMbalireCV/main.pdf"; \
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

# Show help
help:
    @echo "Portfolio Commands:"
    @echo "  just serve        - Start development server"
    @echo "  just build        - Build for production"
    @echo "  just build-dev    - Build for development"
    @echo "  just test         - Run tests"
    @echo "  just test-watch   - Run tests in watch mode"
    @echo "  just preview      - Preview production build"
    @echo "  just deploy       - Deploy to Firebase"
    @echo "  just deploy-force - Force deploy to Firebase"
    @echo "  just cv           - Open CV document"
    @echo "  just clean        - Clean build artifacts"
    @echo "  just install      - Install dependencies"
    @echo "  just update       - Update dependencies"
    @echo "  just lint         - Lint code"
    @echo "  just format       - Format code"
    @echo "  just help         - Show this help"
