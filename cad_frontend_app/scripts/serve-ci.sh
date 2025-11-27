#!/usr/bin/env sh
set -euo pipefail

# NOTE: No HOST is set for CRA by default - relies on upstream devserver defaults
# This script serves build output for Cypress to use a production build (see CI_E2E_README.md)

# Build the app if build output is missing
if [ ! -d "build" ]; then
  echo "[serve-ci] Build folder not found. Building..."
  npm run build
fi

echo "[serve-ci] Serving build on http://localhost:3000"
npx serve -s build -l 3000
