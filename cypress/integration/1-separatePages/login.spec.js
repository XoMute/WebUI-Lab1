describe('Testing Login page', () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    it('tries to login without username', () => {
        cy.get('input[name="username"]').should('contain', '')
        cy.get('button').contains('Login').click()
        cy.url().should('contain', '/login')
        cy.get('a').contains('Logout').should('not.exist')
    })

    it ('tries to login without password', () => {
        cy.get('input[name="username"]').type('user')
        cy.get('button').contains('Login').click()
        cy.url().should('contain', '/login')
        cy.get('a').contains('Logout').should('not.exist')
    })

    it ('tries to login with wrong username', () => {
        cy.get('input[name="username"]').type('user')
        cy.get('input[name="password"]').type('123')
        cy.get('button').contains('Login').click()
        cy.url().should('contain', '/home')
        cy.get('a').contains('Logout').should('not.exist')
    })

    it ('tries to login as admin with wrong password', () => {
        cy.get('input[name="username"]').type('admin')
        cy.get('input[name="password"]').type('123')
        cy.get('button').contains('Login').click()
        cy.url().should('contain', '/home')
        cy.get('a').contains('Logout').should('not.exist')
    })

    it ('logins as admin', () => {
        cy.get('input[name="username"]').type('admin')
        cy.get('input[name="password"]').type('a')
        cy.get('button').contains('Login').click()
        cy.url().should('contain', '/home')
        cy.get('a').contains('Logout')
    })
})