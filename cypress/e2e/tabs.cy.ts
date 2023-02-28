import * as stripe from "stripe";

const url = 'https://www.helprapp.fr/login'
const loginpage = 'http://localhost:8080/login'

describe('Tabs navigation', () => {
    it('Testing Create Flow', () => {
        cy.visit(loginpage)
        cy.viewport(1280, 720)
        cy.wait(500)
        cy.get('#login').type("testUser", { force: true })
        cy.wait(500)
        cy.get('#password').type("123soleil", { force: true })
        cy.get('[type="submit"] > .w-full').click()
        cy.wait(4000)
        cy.get('.mb-2').click()
    })

    it('Testing My Flows', () => {
        cy.visit(loginpage)
        cy.viewport(1280, 720)
        cy.wait(500)
        cy.get('#login').type("testUser", { force: true })
        cy.wait(500)
        cy.get('#password').type("123soleil", { force: true })
        cy.get('[type="submit"] > .w-full').click()
        cy.wait(4000)
        cy.get('[href="/app/my-flows"]').click()
    })

    it('Testing Providers', () => {
        cy.visit(loginpage)
        cy.viewport(1280, 720)
        cy.wait(500)
        cy.get('#login').type("testUser", { force: true })
        cy.wait(500)
        cy.get('#password').type("123soleil", { force: true })
        cy.get('[type="submit"] > .w-full').click()
        cy.wait(4000)
        cy.get('[href="/app/providers"]').click()
    })

    it('Testing Community', () => {
        cy.visit(loginpage)
        cy.viewport(1280, 720)
        cy.wait(500)
        cy.get('#login').type("testUser", { force: true })
        cy.wait(500)
        cy.get('#password').type("123soleil", { force: true })
        cy.get('[type="submit"] > .w-full').click()
        cy.wait(4000)
        cy.get('[href="/app/community"]').click()
    })

    it('Testing Profile', () => {
        cy.visit(loginpage)
        cy.viewport(1280, 720)
        cy.wait(500)
        cy.get('#login').type("testUser", { force: true })
        cy.wait(500)
        cy.get('#password').type("123soleil", { force: true })
        cy.get('[type="submit"] > .w-full').click()
        cy.wait(4000)
        cy.get('[href="/app/profile/5"]').click()
    })

    it('Testing Edit Profile', () => {
        cy.visit(loginpage)
        cy.viewport(1280, 720)
        cy.wait(500)
        cy.get('#login').type("testUser", { force: true })
        cy.wait(500)
        cy.get('#password').type("123soleil", { force: true })
        cy.get('[type="submit"] > .w-full').click()
        cy.wait(4000)
        cy.get('[href="/app/edit-profile"]').click()
    })

    it('Testing Settings', () => {
        cy.visit(loginpage)
        cy.viewport(1280, 720)
        cy.wait(500)
        cy.get('#login').type("testUser", { force: true })
        cy.wait(500)
        cy.get('#password').type("123soleil", { force: true })
        cy.get('[type="submit"] > .w-full').click()
        cy.wait(4000)
        cy.get('[href="/app/settings"]').click()
    })

    it('Testing Logout', () => {
        cy.visit(loginpage)
        cy.viewport(1280, 720)
        cy.wait(500)
        cy.get('#login').type("testUser", { force: true })
        cy.wait(500)
        cy.get('#password').type("123soleil", { force: true })
        cy.get('[type="submit"] > .w-full').click()
        cy.wait(4000)
        cy.get('.mt-5 > :nth-child(5)').click()
    })
})