describe('Testing About page', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('visits About page from Home page', () => {
        cy.get('#nav').contains('About').click()
        cy.url().should('include', '/about')
    })

    it('checks that About page contains name of blog\'s creator', () => {
        cy.get('#nav').contains('About').click()
        cy.url().should('include', '/about')
        cy.contains('h1', 'Dmytro Khomutnyk')
    })
})