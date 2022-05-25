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
})