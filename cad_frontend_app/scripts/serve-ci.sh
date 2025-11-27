#!/usr/bin/env sh
set -euo pipefail

# Build the app if build output is missing
if [ ! -d "build" ]; then
  echo "[serve-ci] Build folder not found. Building..."
  npm run build
fi

echo "[serve-ci] Serving build on http://localhost:3000"
npx serve -s build -l 3000
