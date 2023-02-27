import * as stripe from "stripe";

const url = 'https://www.helprapp.fr/signup'
const registerpage = 'http://localhost:8080/signup'

describe('Register Page', () => {
    it('Testing Register Button', () => {
        cy.visit(registerpage)
        cy.viewport(1280, 720)
        cy.get('#username').type("username", { force: true })
        cy.get('#firstname').type("firstname", { force: true })
        cy.get('#lastname').type("lastname", { force: true })
        cy.get('#email').type("usertest@gmail.com", { force: true })
        cy.get('#password').type("123soleil", { force: true })
        cy.get('#confirm-password').type("123soleil", { force: true })
        cy.get('[type="submit"] > .w-full').click()
    })
})