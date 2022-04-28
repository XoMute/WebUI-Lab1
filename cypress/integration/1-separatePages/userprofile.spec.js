describe('Testing User Profile page', () => {
    beforeEach(() => {
        cy.visit('/login') // 'visit' ensures that state is always resetted
    })

    it('logins as admin and tries to update username to blank', () => {
        cy.get('input[name="username"]').type('admin')
        cy.get('input[name="password"]').type('a')
        cy.contains('button', 'Login').click()

        cy.contains('a', 'My Profile').click()
        cy.url().should('contain', '/profile')
        cy.get('input[name="username"]').clear()
        cy.contains('button', 'Update').click()
        cy.url().should('contain', '/profile')
    })

    it('logins as admin and changes password', () => {
        cy.get('input[name="username"]').type('admin')
        cy.get('input[name="password"]').type('a')
        cy.contains('button', 'Login').click()

        cy.contains('a', 'My Profile').click()
        cy.url().should('contain', '/profile')
        cy.get('input[name="password"]').clear().type('123')
        cy.contains('button', 'Update').click()
        cy.url().should('contain', '/profile')

        cy.contains('a', 'Logout').click()
        cy.contains('a', 'Login').click()
        cy.get('input[name="username"]').type('admin')
        cy.get('input[name="password"]').type('a')
        cy.contains('button', 'Login').click()
        cy.url().should('contain', '/home')
        cy.contains('a', 'Logout').should('not.exist')

        cy.contains('a', 'Login').click()
        cy.get('input[name="username"]').type('admin')
        cy.get('input[name="password"]').type('123')
        cy.contains('button', 'Login').click()
        cy.url().should('contain', '/home')
        cy.contains('a', 'Logout').click()
    })
})