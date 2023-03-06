const url = 'https://www.helprapp.fr'
const localhost = 'http://localhost:8080'

describe('Navigation Bar', () => {

  it('Go to Home page', () => {
    cy.visit(url)
    cy.viewport(1280, 720)
      cy.get('#home').click()
  }),

      it('Go to Pricing page', () => {
    cy.visit(url)
    cy.viewport(1280, 720)
    cy.get('#pricing').click()
    cy.url().should('include', '/pricing')
  }),

      it('Go to Integrations page', () => {
          cy.visit(url)
        cy.viewport(1280, 720)
        cy.get('#integrations').click()
        cy.url().should('include', '/integrations')
    }),

      it('Go to Team page', () => {
          cy.visit(url)
        cy.viewport(1280, 720)
        cy.get('#team').click()
        cy.url().should('include', '/team')
    }),

      it('Go to Changelog page', () => {
          cy.visit(url)
          cy.viewport(1280, 720)
          cy.get('#changelog').click()
          cy.url().should('include', '/changelog')
      }),

      it('Go to Contact page', () => {
          cy.visit(url)
        cy.viewport(1280, 720)
        cy.get('#contact').click()
        cy.url().should('include', '/contact')
    }),


      it('Click on helpr logo and back to Home page', () => {
          cy.visit(url)
    cy.viewport(1280, 720)
    cy.get('#logo').click()
  })
})