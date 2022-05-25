import faker from 'faker'
import * as FormHelper from '../support/form-helper'

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
})