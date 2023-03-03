import * as stripe from "stripe";

const url = 'https://www.helprapp.fr/contact'
const contactpage = 'http://localhost:8080/contact'

describe('Contact', () => {
    it('Testing Contact Form', () => {
        cy.visit(contactpage)
        cy.viewport(1280, 720)
        cy.wait(500)
        cy.get('#full-name').type("Firstname Lastname", { force: true })
        cy.wait(500)
        cy.get('#email').type("usertest@gmail.com", { force: true })
        cy.wait(500)
        cy.get('#phone').type("0606060606", { force: true })
        cy.wait(500)
        cy.get('#subject').type("Test subject", { force: true })
        cy.wait(500)
        cy.get('#message').type("Test message", { force: true })
        cy.get(':nth-child(6) > .btn-primary').click()
    })
})