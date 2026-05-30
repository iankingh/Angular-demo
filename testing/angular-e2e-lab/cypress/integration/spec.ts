/// <reference types="Cypress" />
context('App test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });
  it('should display welcome message', () => {
    cy.get('app-root h1').contains('Welcome to app!')
    cy.get('[href="https://angular.io/tutorial"] > span').contains('')
  });
});
