/**
 * Global Cypress support.
 * Temporary mitigation for React Fast Refresh runtime overlay errors which
 * can surface as unhandled exceptions during E2E in CI.
 *
 * This ignores specific error messages thrown by the React Refresh runtime /
 * overlay during development. We keep this targeted to avoid hiding real bugs.
 */
Cypress.on('uncaught:exception', (err) => {
  const msg = String(err && (err.message || err));
  // Common react-refresh / overlay messages to ignore
  const ignoreSubstrings = [
    'ReactRefreshRuntime',
    'Overlay for runtime errors',
    'HMR update failed',
    'Fast Refresh had to perform a full reload',
    'ResizeObserver loop limit exceeded',
  ];
  if (ignoreSubstrings.some((s) => msg.includes(s))) {
    return false; // prevent failing the test
  }
  return true; // allow other errors to fail tests
});

// You can add custom commands or global beforeEach here
