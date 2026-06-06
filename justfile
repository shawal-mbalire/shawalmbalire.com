# Root Justfile for shawalmbalire.com

# Modules for localized commands
mod angular "angular_app/justfile"
mod latex "latex_app/justfile"

# Default: list all commands
default:
    @just --list

# --- Orchestration ---

# Build everything (CV and then Angular App)
build:
    just latex build
    mkdir -p angular_app/public/documents
    cp latex_app/ShawalMbalireCV.pdf angular_app/public/documents/MbalireShawalCV.pdf
    just angular build

# Clean everything
clean:
    just latex clean
    just angular clean

# Install everything
install:
    just angular install
