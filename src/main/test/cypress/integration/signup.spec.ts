import faker from 'faker'
import * as FormHelper from '../support/form-helper'
import * as Http from '../support/signup-mocks'


const populateFields = (): void => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(8))
    cy.getByTestId('email').focus().type(faker.internet.email())
    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('password').focus().type(password)
    cy.getByTestId('passwordConfirmation').focus().type(password)
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('Signup - Component', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

   it('Should load with correct initial state', () => {
    FormHelper.testInputStatus('name', 'Campo obrigatório')
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
   })

   it('Should present error if form is invalid', () => {
     cy.getByTestId('name').focus().type(faker.random.alphaNumeric(4))
     FormHelper.testInputStatus('name', 'Quantidade de caracteres insuficiente')
     cy.getByTestId('email').focus().type(faker.random.word())
     FormHelper.testInputStatus('email', 'O campo Email é inválido')
     cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
     FormHelper.testInputStatus(
       'password',
       'Quantidade de caracteres insuficiente'
     )
     cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(3))
     FormHelper.testInputStatus(
       'password',
       'Quantidade de caracteres insuficiente'
     )
     cy.getByTestId('submit').should('have.attr', 'disabled')
     cy.getByTestId('error-wrap').should('not.have.descendants')
   })

   it('Should present valid state if form is valid', () => {
     cy.getByTestId('name').focus().type(faker.random.alphaNumeric(8))
     FormHelper.testInputStatus('name')
     cy.getByTestId('email').focus().type(faker.internet.email())
     FormHelper.testInputStatus('email')
     const password = faker.random.alphaNumeric(5)
     cy.getByTestId('password').focus().type(password)
     FormHelper.testInputStatus('password')
     cy.getByTestId('passwordConfirmation').focus().type(password)
     FormHelper.testInputStatus('passwordConfirmation')
     cy.getByTestId('submit').should('not.have.attr', 'disabled')
     cy.getByTestId('error-wrap').should('not.have.descendants')
   })

   it('Should present EmailInUseError on 403', () => {
     Http.mockEmailInUseError()
     simulateValidSubmit()
     FormHelper.testErrorMessage('Esse e-mail já está em uso')
     FormHelper.testUrl('/signup')
   })

    it('Should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testErrorMessage('Erro inesperado, tente novamente')
    FormHelper.testUrl('/signup')
    })

    it('Should prevent save accessToken if valid credentials are provided', () => {
      Http.mockOk()
      simulateValidSubmit()
      cy.getByTestId('error-message').should('not.exist')
      cy.getByTestId('spinner').should('not.exist')
      FormHelper.testUrl('/')
      cy.window().then((window) =>
        assert.isOk(window.localStorage.getItem('accessToken'))
      )
    })

    it('Should prevent multiple submits', () => {
      Http.mockOk()
      populateFields()
      cy.getByTestId('submit').dblclick()
      FormHelper.testHttpCallsCount(1)
    })
})