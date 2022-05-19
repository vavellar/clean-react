import faker from 'faker'

const baseUrl = Cypress.config().baseUrl

describe('Login - Component', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('/login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('submit')
      .should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

   it('Should present error if form is invalid', () => {
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

   it('Should present unexpected error on 400', () => {
     cy.route({
       method: 'POST',
       url: /login/,
       status: 400,
       response: {
         error: faker.random.words()
       }
     })
     cy.getByTestId('email').focus().type(faker.internet.email())
     cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5)).type('{enter}')
     cy.getByTestId('error-message').should(
       'contain.text',
       'Erro inesperado, tente novamente'
     )
     cy.url().should('equal', `${baseUrl}/login`)
   })

    it('Should present invalid credentials on 401', () => {
      cy.route({
        method: 'POST',
        url: /login/,
        status: 401,
        response: {
          error: faker.random.words()
        }
      })
      cy.getByTestId('email').focus().type(faker.internet.email())
      cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
      cy.getByTestId('submit').click()
      cy.getByTestId('error-message').should(
        'contain.text',
        'Credênciais inválidas'
      )
      cy.url().should('equal', `${baseUrl}/login`)
    })

    it('Should prevent multiple submits', () => {
      cy.route({
        method: 'POST',
        url: /login/,
        status: 200,
        response: {
          accessToken: faker.datatype.uuid()
        }
      }).as('request')
      cy.getByTestId('email').focus().type(faker.internet.email())
      cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
      cy.getByTestId('submit').dblclick()
      cy.get('@request.all').should('have.length', 1)
    })


    it('Should not call submit if form is invalid', () => {
      cy.route({
        method: 'POST',
        url: /login/,
        status: 200,
        response: {
          accessToken: faker.datatype.uuid()
        }
      }).as('request')
      cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
      cy.get('@request.all').should('have.length', 0)
    })
});