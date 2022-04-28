describe('Tests NewPost page', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('logins as admin and tries to create new post without title', () => {
        cy.contains('a', 'Login').click()
        cy.get('input[name="username"]').type('admin')
        cy.get('input[name="password"]').type('a')
        cy.contains('button', 'Login').click()

        cy.contains('a', 'Create Post').click()
        cy.url().should('contain', '/create')

        cy.contains('button', 'Create').click()
        cy.url().should('contain', '/create')
    })

    it('logins as admin and tries to create new post without content', () => {
        cy.contains('a', 'Login').click()
        cy.get('input[name="username"]').type('admin')
        cy.get('input[name="password"]').type('a')
        cy.contains('button', 'Login').click()

        cy.contains('a', 'Create Post').click()
        cy.get('input#title').type('Post title')
        cy.contains('button', 'Create').click()
        cy.url().should('contain', '/create')
    })

    it('logins as admin and creates new post', () => {
        cy.contains('a', 'Login').click()
        cy.get('input[name="username"]').type('admin')
        cy.get('input[name="password"]').type('a')
        cy.contains('button', 'Login').click()

        cy.contains('a', 'Create Post').click()
        cy.get('input#title').type('Post title')
        cy.get('.ql-editor').type('<br>Some post<br>with multiple<br>lines.')
        cy.contains('button', 'Create').click()
        cy.url().should('contain', '/home')

        cy.get('.list-group').find('.list-group-item').should('have.length', 2)
    })
})