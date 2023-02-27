describe('Home page', () => {

  it('Go to Home page', () => {
    cy.visit('https://www.helprapp.fr')
    cy.viewport(1280, 720)
    cy.contains('Home').click()
  }),

      it('Go to Pricing page', () => {
    cy.visit('https://www.helprapp.fr')
    cy.viewport(1280, 720)
    cy.contains('Pricing').click()
    cy.url().should('include', '/pricing')
  }),

      it('Go to Contact page', () => {
        cy.visit('https://www.helprapp.fr')
        cy.viewport(1280, 720)
        cy.contains('Contact').click()
        cy.url().should('include', '/contact')
    }),

      it('Click on helpr logo and back to Home page', () => {
    cy.visit('https://www.helprapp.fr')
    cy.viewport(1280, 720)
    cy.contains('helpr').click()
  })
})