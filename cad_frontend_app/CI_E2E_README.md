# Cypress E2E in CI

This frontend uses Create React App. For CI stability, Cypress runs against a statically served production build to avoid React Fast Refresh development runtime overlays.

Steps to run in CI:
1. Build the app:
   - npm ci
   - npm run build
2. Serve the build on the expected baseUrl (http://localhost:3000):
   - npm run serve:ci
3. In parallel, execute Cypress:
   - npx cypress run

Fast Refresh mitigation:
- We added a targeted handler in cypress/support/e2e.js to ignore known React Refresh runtime overlay errors during CI.
- Optionally, you can disable CRA Fast Refresh entirely by setting FAST_REFRESH=false for the dev server runs:
  - FAST_REFRESH=false npm start
  - Note: This is not necessary when using the production build + static serve approach above.

Environment:
- The app reads API endpoints from REACT_APP_* variables. Ensure values are set in the environment or .env prior to build if needed (e.g., REACT_APP_API_BASE).
