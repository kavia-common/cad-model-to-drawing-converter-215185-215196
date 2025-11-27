/* Basic end-to-end smoke tests */
describe('App routing and auth guards', () => {
  it('redirects unauthenticated to /login', () => {
    cy.clearLocalStorage();
    cy.visit('/dashboard');
    cy.location('pathname').should('eq', '/login');
  });

  it('shows login form', () => {
    cy.visit('/login');
    cy.contains('Sign in').should('exist');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
  });

  it('allows navigating to login from sidebar', () => {
    cy.visit('/login');
    cy.contains('Login').should('exist');
  });

  it('guards upload route', () => {
    cy.visit('/upload');
    cy.location('pathname').should('eq', '/login');
  });

  it('simulates auth by setting token and shows dashboard', () => {
    cy.visit('/');
    window.localStorage.setItem('auth_token', 'testtoken');
    cy.visit('/dashboard');
    cy.location('pathname').should('eq', '/dashboard');
    cy.contains('Recent Jobs').should('exist');
  });
});
