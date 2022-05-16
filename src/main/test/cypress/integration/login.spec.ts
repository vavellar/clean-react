import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
    beforeEach(() => {
        cy.visit('/login')
    })
    // it('Should load with correct initial state', () => {
    //     cy.get('[data-testid="email-status"]').should('have.attr', 'title', 'Campo obrigatório')
    // });

    it('Should load with correct initial state', () => {
      cy.getByTestId('email').should('have.attr', 'readonly')
      cy.getByTestId('email-status')
        .should('have.attr', 'title', 'Campo obrigatório')
        .should('contain.text', '🔴')
      cy.getByTestId('email').should('have.attr', 'readonly')
      cy.getByTestId('password-status')
        .should('have.attr', 'title', 'Campo obrigatório')
        .should('contain.text', '🔴')
      cy.getByTestId('submit').should('have.attr','disabled')
      cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present error state if form is invalid', () => {
      cy.getByTestId('email').focus().type(faker.random.word())
      cy.getByTestId('email-status')
        .should('have.attr', 'title', 'O campo Email é inválido')
        .should('contain.text', '🔴')
      cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
      cy.getByTestId('password-status')
        .should('have.attr', 'title', 'Quantidade de caracteres insuficiente')
        .should('contain.text', '🔴')
      cy.getByTestId('submit').should('have.attr', 'disabled')
      cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present valid state if form is valid', () => {
      cy.getByTestId('email').focus().type(faker.internet.email())
      cy.getByTestId('email-status')
        .should('have.attr', 'title', 'Tudo certo')
        .should('contain.text', '🟢')
      cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
      cy.getByTestId('password-status')
        .should('have.attr', 'title', 'Tudo certo')
        .should('contain.text', '🟢')
      cy.getByTestId('submit').should('not.have.attr', 'disabled')
      cy.getByTestId('error-wrap').should('not.have.descendants')
    })

     it('Should present error if invalid credentials are provided', () => {
       cy.getByTestId('email').focus().type(faker.internet.email())
       cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
       cy.getByTestId('submit').click()
       cy.getByTestId('error-wrap')
         .getByTestId('spinner').should('exist')
         .getByTestId('error-message').should('not.exist')
         .getByTestId('error-message').should('contain.text', 'Credênciais inválidas')
       cy.url().should('eq', `${baseUrl}/login`) 
     })
});