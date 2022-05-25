import faker from 'faker'
import * as FormHelper from '../support/form-helper'
import * as Http from '../support/login-mocks'

describe('Login - Component', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Should load with correct initial state', () => {
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', 'O campo Email é inválido')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Quantidade de caracteres insuficiente')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    FormHelper.testInputStatus('email')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present invalid credentials on 401', () => {
    Http.mockInvalidCredentialsError()
    FormHelper.simulateValidSubmit()
    FormHelper.testErrorMessage('Credênciais inválidas')
    FormHelper.testUrl('/login')
  })

  it('Should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError()
    FormHelper.simulateValidSubmit()
    FormHelper.testErrorMessage('Erro inesperado, tente novamente')
    FormHelper.testUrl('/login')
  })

  it('Should prevent save accessToken if valid credentials are provided', () => {
    Http.mockOk()
    FormHelper.simulateValidSubmit()
    cy.getByTestId('error-message').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem('accessToken'))
    )
  })

  it('Should prevent multiple submits', () => {
    Http.mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').dblclick()
    FormHelper.testHttpCallsCount(1)
  })

  it('Should not call submit if form is invalid', () => {
    Http.mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    FormHelper.testHttpCallsCount(0)
  })
})
