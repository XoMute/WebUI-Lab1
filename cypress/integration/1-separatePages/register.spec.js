describe('Testing Registration page', () => {
    beforeEach(() => {
        cy.visit('/register') // 'visit' ensures that state is always resetted
    })

    it('tries to register with empty fields', () => {
        cy.get('button').contains('Register').click()
        cy.url().should('contain', '/register')
    })

    it('tries to register with empty username', () => {
        cy.get('input[name="firstname"]').type('Name')
        cy.get('input[name="lastname"]').type('Lastname')
        cy.get('button').contains('Register').click()
        cy.url().should('contain', '/register')
    })

    it('tries to register new user', () => {
        cy.get('input[name="firstname"]').type('Name')
        cy.get('input[name="lastname"]').type('Lastname')
        cy.get('input[name="username"]').type('user')
        cy.get('input[name="password"]').type('123')
        cy.contains('button', 'Register').click()
        cy.url().should('contain', '/login')
    })

    it('tries to register new user with existing username', () => {
        cy.get('input[name="firstname"]').type('Petro')
        cy.get('input[name="lastname"]').type('Petrenko')
        cy.get('input[name="username"]').type('user')
        cy.get('input[name="password"]').type('qwe')
        cy.contains('button', 'Register').click()
        cy.url().should('contain', '/login')

        cy.get('a').contains('Register').click()
        cy.get('input[name="firstname"]').type('Name')
        cy.get('input[name="lastname"]').type('Lastname')
        cy.get('input[name="username"]').type('user')
        cy.get('input[name="password"]').type('123')
        cy.contains('button', 'Register').click()
        cy.url().should('contain', '/register')
    })
})