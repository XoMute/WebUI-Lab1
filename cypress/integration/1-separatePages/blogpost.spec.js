describe('Testing BlogPost page', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('opens first blog post and checks it\'s author', () => {
        cy.get('.list-group').find('.list-group-item').click()
        cy.url().should('contain', '/posts')
        cy.contains('Author').should('contain', 'The Admin')
        cy.contains('button', 'Delete').should('not.exist')
    })

    it('opens first blog post and checks it\'s comments', () => {
        cy.get('.list-group').find('.list-group-item').click()
        cy.url().should('contain', '/posts')
        cy.get('.list-group').find('.list-group-item').should('have.length', 2)
    })

    it('opens first blog post and tries to add new comment without username', () => {
        cy.get('.list-group').find('.list-group-item').click()
        cy.url().should('contain', '/posts')
        cy.get('input[name="name"]').should('contain', '')
        cy.contains('button', 'Add comment').click()
        cy.get('.list-group').find('.list-group-item').should('have.length', 2)
    })

    it('opens first blog post and tries to add new comment without content', () => {
        cy.get('.list-group').find('.list-group-item').click()
        cy.url().should('contain', '/posts')
        cy.get('input[name="name"]').type('Some Name')
        cy.contains('button', 'Add comment').click()
        cy.get('.list-group').find('.list-group-item').should('have.length', 2)
    })

    it('opens first blog post and adds new comment', () => {
        cy.get('.list-group').find('.list-group-item').click()
        cy.url().should('contain', '/posts')
        cy.get('input[name="name"]').type('Some Name')
        cy.get('textarea').type('Some comment text')
        cy.contains('button', 'Add comment').click()
        cy.get('.list-group').find('.list-group-item').should('have.length', 3)
    })
})