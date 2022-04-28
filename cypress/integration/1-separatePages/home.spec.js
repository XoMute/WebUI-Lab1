describe('Testing Home page', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('checks that only one blog post is present', () => {
        cy.get('.list-group').find('.list-group-item').should('have.length', 1)
    })

    it('opens first blog post', () => {
        cy.get('.list-group').find('.list-group-item').click()
        cy.url().should('contain', '/posts')
    })
})