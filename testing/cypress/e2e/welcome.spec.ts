describe('Welcome', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the welcome heading', () => {
    cy.get('app-root h1').should('contain', 'Welcome to app!');
  });

  it('renders the Angular tutorial link with a label', () => {
    cy.get('[href="https://angular.io/tutorial"] > span').should(
      'contain',
      'Learn Angular',
    );
  });

  it('increments the counter on click', () => {
    cy.get('button[aria-label="increment"]').as('counter');
    cy.get('@counter').should('contain', 'Count is 0');
    cy.get('@counter').click();
    cy.get('@counter').should('contain', 'Count is 1');
  });
});