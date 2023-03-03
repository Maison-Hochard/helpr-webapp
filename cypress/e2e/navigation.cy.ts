const url = 'https://www.helprapp.fr'
const localhost = 'http://localhost:8080'

describe('Navigation Bar', () => {

  it('Go to Home page', () => {
    cy.visit(localhost)
    cy.viewport(1280, 720)
      cy.get('#home').click()
  }),

      it('Go to Pricing page', () => {
    cy.visit(localhost)
    cy.viewport(1280, 720)
    cy.get('#pricing').click()
    cy.url().should('include', '/pricing')
  }),

      it('Go to Contact page', () => {
          cy.visit(localhost)
        cy.viewport(1280, 720)
        cy.get('#contact').click()
        cy.url().should('include', '/contact')
    }),

      it('Click on helpr logo and back to Home page', () => {
          cy.visit(localhost)
    cy.viewport(1280, 720)
    cy.get('#logo').click()
  })
})