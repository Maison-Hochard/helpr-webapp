import * as stripe from "stripe";

const url = 'https://www.helprapp.fr/pricing'
const pricingpage = 'http://localhost:8080/pricing'

describe('Pricing Page', () => {

  it('Testing Payment Button Unlogged', () => {
    cy.visit(url)
    cy.viewport(1280, 720)
    cy.get('button[name=priceId]').click() // Click on Payment button
      cy.url().should('contain', '/login')
  }),

    it('Testing Payment Button Logged', () => {
        cy.visit(url)
        cy.viewport(1280, 720)
        cy.get('.hidden > .btn-primary').click() // Click on Login button
        cy.wait(500)
        cy.get('#login').type("testUser", { force: true}) // Type username
        cy.wait(500)
        cy.get('#password').type("123soleil", { force: true}) // Type password
        cy.get('[type="submit"] > .w-full').click() // Click on Login button
        cy.wait(4000)
        cy.get('.px-4 > div > #logo > .text-md').click() // Click on helpr logo
        cy.get('#pricing').click() // Click on Pricing button
    })
})