describe('Test complex scenarios', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('register new user -> login as new user -> logout', () => {
        cy.contains('a', 'Register').click()
        cy.get('input[name="firstname"]').type('Name')
        cy.get('input[name="lastname"]').type('Lastname')
        cy.get('input[name="username"]').type('user')
        cy.get('input[name="password"]').type('123')
        cy.get('button').contains('Register').click()
        cy.url().should('contain', '/login')

        cy.get('input[name="username"]').type('user')
        cy.get('input[name="password"]').type('123')
        cy.get('button').contains('Login').click()
        cy.url().should('contain', '/home')

        cy.get('a').contains('Logout').click()
        cy.get('a').contains('Login')
    })


    it('login as admin -> delete first blog post', () => {
        cy.contains('a', 'Login').click()

        cy.get('input[name="username"]').type('admin')
        cy.get('input[name="password"]').type('a')
        cy.get('button').contains('Login').click()

        cy.get('.list-group').find('.list-group-item').click()
        cy.url().should('contain', '/posts')
        cy.contains('Author').should('contain', 'The Admin')
        cy.contains('button', 'Delete').click()
        cy.url().should('contain', '/home')

        cy.get('.list-group').find('.list-group-item').should('have.length', 0)
    })

    it('register new user -> login as new user -> create new post', () => {
        cy.contains('a', 'Register').click()
        cy.get('input[name="firstname"]').type('Petro')
        cy.get('input[name="lastname"]').type('Petrenko')
        cy.get('input[name="username"]').type('userPetro')
        cy.get('input[name="password"]').type('123')
        cy.contains('button', 'Register').click()

        cy.get('input[name="username"]').type('userPetro')
        cy.get('input[name="password"]').type('123')
        cy.contains('button', 'Login').click()

        cy.contains('a', 'Create Post').click()
        cy.get('input#title').type('New Post')
        cy.get('.ql-editor').type('Some post content')
        cy.contains('button', 'Create').click()

        cy.get('.list-group').find('.list-group-item').should('have.length', 2)
    })
})